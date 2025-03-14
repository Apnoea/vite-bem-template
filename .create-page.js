import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const pagesDir = resolve(fileURLToPath(import.meta.url), '..', 'src/pages')
const pageName = process.argv[process.argv.length - 1]

const pageDir = join(pagesDir, pageName)
const htmlFilePath = join(pageDir, 'index.html')
const pugFilePath = join(pageDir, `${pageName}.pug`)

fs.mkdir(`${pagesDir}/${pageName}`, () => {
  let error = false
  if (fs.existsSync(htmlFilePath)) {
    error = true
    console.log('html файл уже существует')
  } else {
    fs.writeFileSync(htmlFilePath, `<template data-type="pug" data-src="${pageName}.pug"></template>`)
  }
  if (fs.existsSync(pugFilePath)) {
    error = true
    console.log('pug файл уже существует')
  } else {
    const pageTitle = capitalizeFirstLetter(pageName)
    fs.writeFileSync(
      pugFilePath,
      `extends ../../layout/layout

block variables
  -
    const pageName = '${pageName}'
    const pageTitle = '${pageTitle}'

block content
  main
    .inner
      +ui-h1(pageTitle)`
    )
  }
  if (error === false) {
    console.log('Страница успешно создана')
  }
})
