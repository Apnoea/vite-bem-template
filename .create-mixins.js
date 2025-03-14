import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const doNotEditMessage =
  '//- ВНИМАНИЕ! Этот файл генерируется автоматически.\n//- Любые изменения будут потеряны при следующей компиляции.\n\n'
const blocksDir = resolve(fileURLToPath(import.meta.url), '..', 'src/blocks')
const mixinsFilePath = path.join(blocksDir, 'mixins.pug')

function findPugFiles(dir) {
  const fileList = []

  function traverseDirectory(currentDir) {
    const files = fs.readdirSync(currentDir)

    files.forEach((file) => {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverseDirectory(filePath)
      } else if (path.extname(file) === '.pug') {
        const fileName = path.basename(filePath)
        if (fileName !== 'mixins.pug' && fileName !== 'header.pug' && fileName !== 'footer.pug') {
          const relativePath = path.relative(blocksDir, filePath)
          fileList.push(relativePath)
        }
      }
    })
  }

  traverseDirectory(dir)
  return fileList
}

const pugFiles = findPugFiles(blocksDir)
pugFiles.sort()

const mixinsList = pugFiles.map((blockName) => `include ${blockName}`).join('\n')
const content = `${doNotEditMessage}${mixinsList}\n`

fs.writeFileSync(mixinsFilePath, content)
