import path, { resolve } from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

const outDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'dist')

function readWriteAsync(item) {
  fs.readFile(item, 'utf8', function (err, data) {
    if (err) throw err
    const newValue = data.replace(/="(\.\.\/)+/g, '="')
    fs.writeFile(item, newValue, 'utf8', function (err_) {
      if (err_) throw err_
    })
  })
}

fs.readdir(outDir, (err, files) => {
  if (err) throw err
  for (const file of files) {
    const ext = path.extname(file)
    if (ext !== null && ext === '.html') {
      const newPath = `${outDir}/${file}`
      readWriteAsync(newPath)
    }
  }
})
