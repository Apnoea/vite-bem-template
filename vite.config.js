import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { exec } from 'node:child_process'
import viteMultipage from 'vite-plugin-multipage'
import vitePug from 'vite-plugin-pug-transformer'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from 'vite-plugin-stylelint'
import viteSassGlob from 'vite-plugin-sass-glob-import'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const root = resolve(fileURLToPath(import.meta.url), '..', 'src')
const outDir = resolve(fileURLToPath(import.meta.url), '..', 'dist')

export default defineConfig({
  root,
  base: './',
  clearScreen: false,
  build: {
    outDir,
    emptyOutDir: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: '1024',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.names[0].split('.').pop()
          const typeMap = {
            png: 'images',
            jpg: 'images',
            jpeg: 'images',
            svg: 'images',
            gif: 'images',
            ico: 'images',
            css: 'styles'
          }
          const folder = typeMap[extType] || extType
          return `${folder}/[name][extname]`
        },
        chunkFileNames: 'scripts/scripts.js'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'import']
      }
    }
  },
  plugins: [
    viteMultipage({
      mimeCheck: true,
      open: '/',
      pageDir: 'pages',
      purgeDir: 'pages',
      removePageDirs: true,
      rootPage: 'index.html'
    }),
    vitePug({
      pugOptions: {
        pretty: true
      }
    }),
    viteEslint({
      failOnError: false
    }),
    viteStylelint(),
    viteSassGlob(),
    ViteImageOptimizer({
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                cleanupIds: {
                  minify: false,
                  remove: false
                },
                convertPathData: false
              }
            }
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
            }
          }
        ]
      },
      png: {
        quality: 80
      },
      jpeg: {
        quality: 80
      },
      jpg: {
        quality: 80
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/images')],
      symbolId: '[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    })
  ]
})
