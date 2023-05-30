import path, { resolve } from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

const pagesDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src/pages')
const pageName = process.argv[process.argv.length - 1]

fs.mkdir(`${pagesDir}/${pageName}`, () => {
  let error = false
  if (fs.existsSync(`${pagesDir}/${pageName}/index.html`)) {
    error = true
    console.log('html файл уже существует')
  } else {
    fs.writeFileSync(`${pagesDir}/${pageName}/index.html`, `<template data-type="pug" data-src="${pageName}.pug"></template>`)
  }
  if (fs.existsSync(`${pagesDir}/${pageName}/${pageName}.pug`)) {
    error = true
    console.log('Файл шаблона уже существует')
  } else {
    fs.writeFileSync(`${pagesDir}/${pageName}/${pageName}.pug`,
      `extends ../../layout/layout

block variables
  -
    const pageName = '${pageName}'
    const pageTitle = '${pageName}'

block content
  main
    .inner
      +ui-h1(pageTitle)`)
  }
  if (error === false) {
    console.log('Страница успешно создана')
  }
})
