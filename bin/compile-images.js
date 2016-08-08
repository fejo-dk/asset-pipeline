#!/usr/bin/env node
'use strict'

const gulp = require('gulp')
const rename = require('gulp-rename')
const hasher = require('gulp-hasher')
const readConfig = require('../lib/read-config')
const renameFilesAccordingToMap = require('../lib/rename-files-according-to-map')
const cssConfig = readConfig('cssConfig')
const imagesConfig = readConfig('imagesConfig')
const fontsConfig = readConfig('fontsConfig')
const assetMapLib = require('../lib/asset-map')(cssConfig, imagesConfig, fontsConfig)

gulp.task('compile-images', () => gulp
  .src(imagesConfig.sources)
  .pipe(hasher())
  .pipe(rename((path) => renameFilesAccordingToMap(assetMapLib.calculateAssetMap(hasher.hashes), path)))
  .pipe(gulp.dest(imagesConfig.target.directory))
  .on('end', () => assetMapLib.writeAssetMap(assetMapLib.addPathToAssetMap('images', assetMapLib.calculateAssetMap(hasher.hashes)), 'images'))
)

gulp.task('watch-images', () => {
  gulp.watch(imagesConfig.sources, ['compile-images'])
})

if (process.argv[2] && process.argv[2] === '--watch') {
  gulp.start('watch-images')
} else {
  gulp.start('compile-images')
}
