const path = require('path')
const fs = require('fs')
const url = require('url')
const buildUrl = require('./build-url')

module.exports = (cssConfig, imagesConfig) => {
  const baseUrls = {
    stylesheets: url.parse(cssConfig.baseUrl),
    images: url.parse(imagesConfig.baseUrl)
  }

  const manifests = {
    stylesheets: cssConfig.manifest,
    images: imagesConfig.manifest
  }

  const calculateAssetMap = (hashes) => {
    return Object.keys(hashes).reduce((mapping, fullPath) => {
      const parsedPath = path.parse(fullPath)
      const hash = hashes[fullPath]
      mapping[parsedPath.base] = `${parsedPath.name}-${hash}${parsedPath.ext}`
      return mapping
    }, {})
  }

  const addPathToAssetMap = (type, assetMap) => {
    return Object.keys(assetMap).reduce((mapping, origin) => {
      const destination = assetMap[origin]
      mapping[origin] = buildUrl(baseUrls[type], destination)
      return mapping
    }, {})
  }

  const writeAssetMap = (assetMap, type) => {
    fs.writeFileSync(
      manifests[type],
      JSON.stringify(assetMap))
  }

  const readAssetMap = (type, done) => {
    fs.readFile(
      manifests[type],
      (err, file) => {
        if (err) {
          done(err)
        } else {
          done(null, JSON.parse(file))
        }
      }
    )
  }

  return {
    calculateAssetMap: calculateAssetMap,
    addPathToAssetMap: addPathToAssetMap,
    writeAssetMap: writeAssetMap,
    readAssetMap: readAssetMap
  }
}

