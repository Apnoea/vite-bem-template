import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { exec } from 'node:child_process'

const blocksDir = resolve(fileURLToPath(import.meta.url), '..', 'src/blocks')
const blockPath = process.argv[process.argv.length - 1].replace(/\/$/, '')
const blockName = blockPath.split('/').pop()

const blockDirPath = join(blocksDir, blockPath)
const pugFilePath = join(blockDirPath, `${blockName}.pug`)
const scssFilePath = join(blockDirPath, `${blockName}.scss`)

fs.mkdir(`${blocksDir}/${blockPath}`, { recursive: true }, () => {
  let error = false
  if (fs.existsSync(pugFilePath)) {
    error = true
    console.log('pug файл уже существует')
  } else {
    fs.writeFileSync(
      pugFilePath,
      `mixin ${blockName}(mods)
  -
    const allMods = mods ? mods.split(',').map(mod => mod.trim()[0] === '-' ? \`${blockName}\${mod.trim()}\` : \`\${mod.trim()}__${blockName}\`).join(' ').trim() : ''

  .${blockName}(class=allMods)&attributes(attributes)
    block`
    )
  }
  if (fs.existsSync(scssFilePath)) {
    error = true
    console.log('scss файл уже существует')
  } else {
    fs.writeFileSync(scssFilePath, `.${blockName} {\n  position: relative;\n}\n`)
  }
  if (error === false) {
    console.log('Блок успешно создан')
    exec('node .create-mixins.js')
  }
})
