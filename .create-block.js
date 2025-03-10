import path, { resolve } from 'node:path'
import url from 'node:url'
import fs from 'node:fs'
import { exec } from 'node:child_process'

const blocksDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src/blocks')
let blockPath = process.argv[process.argv.length - 1]
blockPath.slice(-1) === '/' ? blockPath = blockPath.slice(0, -1) : ''
const blockName = blockPath.split('/').pop()

fs.mkdir(`${blocksDir}/${blockPath}`, { recursive: true }, () => {
  let error = false
  if (fs.existsSync(`${blocksDir}/${blockPath}/${blockName}.pug`)) {
    error = true
    console.log('Файл шаблона уже существует')
  } else {
    fs.writeFileSync(`${blocksDir}/${blockPath}/${blockName}.pug`,
      `mixin ${blockName}(mods)
  -
    const allMods = mods ? mods.split(',').map(mod => mod.trim()[0] === '-' ? \`${blockName}\${mod.trim()}\` : \`\${mod.trim()}__${blockName}\`).join(' ').trim() : ''

  .${blockName}(class=allMods)&attributes(attributes)
    block`
    )
  }
  if (fs.existsSync(`${blocksDir}/${blockPath}/${blockName}.scss`)) {
    error = true
    console.log('Файл стилей уже существует')
  } else {
    fs.writeFileSync(`${blocksDir}/${blockPath}/${blockName}.scss`, `.${blockName} {\n  position: relative;\n}\n`)
  }
  if (error === false) {
    console.log('Блок успешно создан')
  }
})
exec('node .create-mixins.js')
