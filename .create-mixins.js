import path from 'node:path'
import fs from 'node:fs'

const doNotEditMessage = '//- ВНИМАНИЕ! Этот файл генерируется автоматически.\n//- Любые изменения будут потеряны при следующей компиляции.\n\n'
const source = path.join(process.cwd(), 'src', 'blocks')

function findPugFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findPugFiles(filePath, fileList)
    } else if (path.extname(file) === '.pug') {
      const fileName = path.basename(filePath)
      if (fileName !== 'mixins.pug' && fileName !== 'header.pug' && fileName !== 'footer.pug') {
        const relativePath = path.relative(source, filePath)
        fileList.push(relativePath)
        fileList.sort()
        const mixinsList = fileList.map(blockName => `include ${blockName}`).join('\n')
        const content = `${doNotEditMessage}${mixinsList}\n`
        fs.writeFileSync(path.join(source, 'mixins.pug'), content)
      }
    }
  })
  return fileList
}

findPugFiles(source)
