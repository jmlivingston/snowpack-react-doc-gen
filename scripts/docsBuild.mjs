// TODO: Add error handling / validation (name parent) / dupes
import babelParser from '@babel/parser'
import fs from 'fs'
import _get from 'lodash.get'
import _set from 'lodash.set'
import path from 'path'
import { getFilesFolders } from './util.mjs'

function getComponentDocs({ code, name, filePath }) {
  // TODO: Refactor to not parse a string and use eval
  // Perhaps with babel, acorn, or react-docgen?
  let config = code.split(`${name}.config`)
  config = `{ ${config[1].split('}')[0].split('{')[1]} }`
  let parsedConfig
  eval(`parsedConfig = new Object(${config})`)
  return {
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
  // TODO: Alphabetize properties
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
      const componentDocs = getComponentDocs({
        code: fileString,
        name: exportName,
        filePath,
      })
      const path = `${componentDocs.parent
        .replace(/\|/g, '.')
        .replace(/\./g, '.children.')}.children.${componentDocs.name}`
      const existingValues = _get(acc, path, {})
      _set(acc, path, { ...existingValues, ...componentDocs, path })
    })

    return acc
  }, {})
  return docConfig
}

const docsConfig = getDocsConfig()

// TODO: Update so filePath turns to component: import('...')

fs.writeFileSync(
  path.join(path.resolve(), 'snowpack/docs/docs-data.js'),
  `export default ${JSON.stringify(docsConfig, null, 2)
    .replace(/\|\|\"/g, '')
    .replace(/\"\|\|/g, '')}`
)
