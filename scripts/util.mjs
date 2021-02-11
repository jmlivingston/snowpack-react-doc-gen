import fs from 'fs'
import path from 'path'

// type - file, folder, both
function getFilesFolders({ dir, isRecursive = true, type = 'file' }) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    let fileFolder = []
    switch (type) {
      case 'file':
        fileFolder = isDirectory ? [] : [name]
        break
      case 'folder':
        fileFolder = isDirectory ? [name] : []
        break
      default:
        fileFolder = [name]
        break
    }
    const fileFolders =
      isRecursive && isDirectory
        ? getFilesFolders({ dir: name, isRecursive, type })
        : []
    return [...files, ...fileFolder, ...fileFolders]
  }, [])
}

export { getFilesFolders }
