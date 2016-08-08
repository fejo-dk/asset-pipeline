#!/usr/bin/env node
'use strict'

const gulp = require('gulp')
const prefix = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const hasher = require('gulp-hasher')
const SassString = require('node-sass').types.String
const readConfig = require('../lib/read-config')
const cssConfig = readConfig('cssConfig')
const imagesConfig = readConfig('imagesConfig')
const fontsConfig = readConfig('fontsConfig')
const assetMapLib = require('../lib/asset-map')(cssConfig, imagesConfig, fontsConfig)
const path = require('path')
const renameFilesAccordingToMap = require('../lib/rename-files-according-to-map')

const unifiedAssetMap = (done) => {
  assetMapLib.readAssetMap('images', (err1, imagesMap) => {
    assetMapLib.readAssetMap('fonts', (err2, fontsMap) => {
      const assetMap = Object.assign({}, imagesMap, fontsMap)
      done(err1 || err2, assetMap)
    })
  })
}

const sassOptions = {
  includePaths: cssConfig.includePaths,

  functions: {
    'asset-url($file)': (file, done) => {
      unifiedAssetMap((err, assetMap) => {
        if (err) {
          throw err
        }

        const assetName = file.getValue()
        const remappedUrl = new SassString(`url("${assetMap[assetName]}")`)
        done(remappedUrl)
      })
    }
  }
}

// TODO: Unify with the calculateAssetMap function
const calculateAssetMap = (entryPoints, hashes) => {
  const reverseEntryPoints = Object.keys(entryPoints).reduce((sum, artifact) => {
    sum[path.basename(cssConfig.entryPoints[artifact])] = artifact
    return sum
  }, {})

  return Object.keys(hashes).reduce((mapping, fullPath) => {
    const parsedPath = path.parse(fullPath)
    const hash = hashes[fullPath]
    const targetBase = reverseEntryPoints[`${parsedPath.name}.scss`]

    mapping[`${targetBase}.css`] = `${targetBase}-${hash}.css`

    return mapping
  }, {})
}

// TODO: This is just for renaming... Can be much simpler
const calculateRenameMap = (entryPoints, hashes) => {
  const reverseEntryPoints = Object.keys(entryPoints).reduce((sum, artifact) => {
    sum[path.basename(cssConfig.entryPoints[artifact])] = artifact
    return sum
  }, {})

  return Object.keys(hashes).reduce((mapping, fullPath) => {
    const parsedPath = path.parse(fullPath)
    const hash = hashes[fullPath]
    const targetBase = reverseEntryPoints[`${parsedPath.name}.scss`]

    mapping[parsedPath.base] = `${targetBase}-${hash}.css`

    return mapping
  }, {})
}

gulp.task('compile-css', () => gulp
  .src(Object.keys(cssConfig.entryPoints).map((artifact) => cssConfig.entryPoints[artifact]))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(prefix(cssConfig.prefixes))
  .pipe(hasher())
  .pipe(rename((p) => renameFilesAccordingToMap(calculateRenameMap(cssConfig.entryPoints, hasher.hashes), p)))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(cssConfig.target.directory))
  .on('end', () => assetMapLib.writeAssetMap(assetMapLib.addPathToAssetMap('stylesheets', calculateAssetMap(cssConfig.entryPoints, hasher.hashes)), 'stylesheets'))
)

gulp.task('watch-css', () => {
  gulp.watch(cssConfig.sources, ['compile-css'])
})

if (process.argv[2] && process.argv[2] === '--watch') {
  gulp.start('watch-css')
} else {
  gulp.start('compile-css')
}
