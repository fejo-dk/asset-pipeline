#!/usr/bin/env node
'use strict'

const path = require('path')
const url = require('url')
const webpack = require('webpack')
const buildUrl = require('../lib/build-url')
const readConfig = require('../lib/read-config')

const watchMode = process.argv.includes('--watch')
const pollMode = process.argv.includes('--poll')

// TODO: Unify with the calculateAssetMap function
const calculateAssetMap = (assets) => {
  return assets.reduce((assetMap, asset) => {
    const baseName = asset.match(/^(.*)-.+\.js$/)[1]
    assetMap[`${baseName}.js`] = buildUrl(baseUrl, asset)
    return assetMap
  }, {})
}

const jsConfig = readConfig('jsConfig')
const baseUrl = url.parse(jsConfig.baseUrl)

const plugins = []

if (!watchMode) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

const compiler = webpack({
  entry: jsConfig.entryPoints,
  output: {
    path: path.join('.', jsConfig.target.directory),
    filename: '[name]-[hash].js'
  },
  plugins: plugins,
  resolve: {
    root: jsConfig.includePaths.map((p) => path.resolve(p)),
    alias: jsConfig.alias
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    }]
  }
})

const done = (err, stats) => {
  if (err) {
    throw err
  }

  console.log(stats.toString({
    chunks: false,
    color: true
  }))

  const assets = Object.keys(stats.compilation.assets)
  require('fs').writeFileSync(
    path.join('.', jsConfig.manifest),
    JSON.stringify(calculateAssetMap(assets)))
}

if (watchMode) {
  compiler.watch({
    aggregateTimeout: 300,
    poll: pollMode
  }, done)
} else {
  compiler.run(done)
}
