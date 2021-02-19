// TODO: Add error handling / validation (name parent) / dupes
import babelParser from '@babel/parser'
import fs from 'fs'
import jscodeshift from 'jscodeshift'
import _get from 'lodash.get'
import _set from 'lodash.set'
import path from 'path'
import { getFilesFolders } from '../../util.mjs'

function removeConfig({ code, name, propertyNames = ['config'] }) {
  const removePath = (path) => jscodeshift(path).remove()

  const withoutExportDefault = jscodeshift(code)
    .find(jscodeshift.ExportDefaultDeclaration)
    .filter((e) => {
      return e
    })
    .forEach(removePath)
    .toSource()

  let unusedExports = []
  const exportsNamed = jscodeshift(withoutExportDefault)
    .find(jscodeshift.ExportNamedDeclaration)
    .forEach((e) => {
      e.node.specifiers.forEach((specifier) => {
        if (specifier.exported.name === name) {
          unusedExports.push(specifier.exported.name)
        }
      })
    })

  const withoutExportNamed = exportsNamed.forEach(removePath).toSource()

  const withoutAssignment = jscodeshift(withoutExportNamed)
    .find(jscodeshift.AssignmentExpression)
    .filter((e) => {
      return (
        e.node.left &&
        e.node.left.property &&
        propertyNames.includes(e.node.left.property.name)
      )
    })
    .forEach(removePath)
    .toSource()

  const withoutImport = jscodeshift(withoutAssignment)
    .find(jscodeshift.ImportDeclaration)
    .filter((e) => {
      return e.node.source && propertyNames.includes(e.node.source.value)
    })
    .forEach(removePath)
    .toSource()

  const withoutRequire = jscodeshift(withoutImport)
    .find(jscodeshift.VariableDeclarator)
    .filter((e) => {
      return (
        e.node.init &&
        e.node.init.callee &&
        e.node.init.callee.name === 'require' &&
        propertyNames.includes(e.node.init.arguments[0].value)
      )
    })
    .forEach(removePath)
    .toSource()

  const withoutFunctions = jscodeshift(withoutRequire)
    .find(jscodeshift.FunctionDeclaration)
    .filter((e) => {
      return exportsNamed.length === 0
        ? false
        : !unusedExports.includes(e.node.id.name)
    })
    .forEach(removePath)
    .toSource()

  const withoutDefineProperty = jscodeshift(withoutFunctions)
    .find(jscodeshift.ExpressionStatement)
    .filter((e) => {
      return (
        e.node.expression &&
        e.node.expression.callee &&
        e.node.expression.callee.name === '_defineProperty' &&
        e.node.expression.arguments &&
        e.node.expression.arguments[1] &&
        e.node.expression.arguments[1].original &&
        propertyNames.includes(e.node.expression.arguments[1].original.value)
      )
    })
    .forEach(removePath)
    .toSource()

  const withoutObjectProperty = jscodeshift(withoutDefineProperty)
    .find(jscodeshift.Property)
    .filter((e) => {
      return (
        e.node.key &&
        propertyNames.includes(e.node.key.name) &&
        e.node.value &&
        e.node.value.type === 'ObjectExpression'
      )
    })
    .forEach(removePath)
    .toSource()

  return withoutObjectProperty
    .replace("import React from 'react';", '')
    .replace("import React from 'react'", '')
    .trim()
}

function getComponentDocs({ code, name, filePath }) {
  // TODO: Use jscodeshift instead of eval
  let config = code.split(`${name}.config`)
  config = `{ ${config[1].split('}')[0].split('{')[1]} }`
  let parsedConfig
  eval(`parsedConfig = new Object(${config})`)
  return {
    // HACK: Allows us to strip it out later
    component: `||import('../../src${filePath.split('src')[1]}')||`,
    name: name,
    name,
    ...parsedConfig,
  }
}

function getExportNames({ ast }) {
  const exportNodes = ast.program.body.filter(
    (body) =>
      body.type === 'ExportNamedDeclaration' ||
      body.type === 'ExportDefaultDeclaration'
  )
  return exportNodes.reduce((acc, exportNode) => {
    return exportNode.declaration != null
      ? [...acc, exportNode.declaration.name]
      : [
          ...acc,
          ...exportNode.specifiers.map((specifier) => specifier.exported.name),
        ]
  }, [])
}

function getDocsConfig() {
  const srcPath = path.join(path.resolve(), 'src')

  const docFiles = getFilesFolders({
    dir: srcPath,
  }).filter((file) => file.includes('doc.jsx'))

  const docConfig = docFiles.reduce((acc, filePath) => {
    const fileString = fs.readFileSync(filePath, 'utf8')
    const fileAst = babelParser.parse(fileString, {
      sourceType: 'module',
      plugins: ['jsx'],
    })
    const exportNames = getExportNames({ ast: fileAst })
    exportNames.forEach((exportName) => {
      const regex = RegExp(`/${exportName}.config.*?}`, 'g')
      const codeConfigSplit = fileString.replace(regex, '')
      console.log(exportName, codeConfigSplit)

      const componentDocs = getComponentDocs({
        code: fileString,
        name: exportName,
        filePath,
      })
      const path = `${componentDocs.parent
        .replace(/\|/g, '.')
        .replace(/\./g, '.children.')}.children.${componentDocs.name}`
      const existingValues = _get(acc, path, {})
      const code = removeConfig({ code: fileString, name: exportName })
      _set(acc, path, {
        ...existingValues,
        ...componentDocs,
        path,
        code,
      })
    })

    return acc
  }, {})
  return docConfig
}

const docsConfig = getDocsConfig()

fs.writeFileSync(
  path.join(path.resolve(), 'scripts/snowpack/docs/docs-data.js'),
  `export default ${JSON.stringify(docsConfig, null, 2)
    // HACK: see above.
    .replace(/\|\|\"/g, '')
    .replace(/\"\|\|/g, '')}`
)
