// TODO: Add error handling / validation (title category) / dupes
import { getFilesFolders } from './util.mjs'
import path from 'path'
import babelParser from '@babel/parser'
import fs from 'fs'
import _set from 'lodash.set'

function getComponentDocs({ code, name, filePath }) {
  // TODO: Refactor to not parse a string and use eval
  // Perhaps with babel, acorn, or react-docgen?
  let config = code.split(`${name}.config`)
  config = `{ ${config[1].split('}')[0].split('{')[1]} }`
  let parsedConfig
  eval(`parsedConfig = new Object(${config})`)
  return {
    filePath: `...src${filePath.split('src')[1]}`,
    title: name,
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
      const componentDocs = getComponentDocs({
        code: fileString,
        name: exportName,
        filePath,
      })
      _set(
        acc,
        `${componentDocs.category}.components.${componentDocs.name}`,
        componentDocs
      )
    })

    return acc
  }, {})
  return docConfig
}

const docsConfig = getDocsConfig()

fs.writeFileSync(
  path.join(path.resolve(), 'snowpack/docs-data.js'),
  `export default ${JSON.stringify(docsConfig, null, 2)}`
)
