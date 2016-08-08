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

gulp.task('compile-fonts', () => gulp
  .src('app/assets/fonts/*')
  .pipe(hasher())
  .pipe(rename((path) => renameFilesAccordingToMap(assetMapLib.calculateAssetMap(hasher.hashes), path)))
  .pipe(gulp.dest(fontsConfig.target.directory))
  .on('end', () => assetMapLib.writeAssetMap(assetMapLib.addPathToAssetMap('fonts', assetMapLib.calculateAssetMap(hasher.hashes)), 'fonts'))
)

gulp.task('watch-fonts', () => {
  gulp.watch(fontsConfig.sources, ['compile-fonts'])
})

if (process.argv[2] && process.argv[2] === '--watch') {
  gulp.start('watch-fonts')
} else {
  gulp.start('compile-fonts')
}
