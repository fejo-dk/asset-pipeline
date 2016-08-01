const renameFilesAccordingToMap = (assetMap, path) => {
  path.basename = assetMap[`${path.basename}${path.extname}`]
  path.extname = ''
  return path
}

module.exports = renameFilesAccordingToMap
