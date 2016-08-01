const fs = require('fs')
const path = require('path')

const readConfig = (configName) => {
  const file = fs.readFileSync(
    path.join('.', 'package.json')
  )
  const parsedFile = JSON.parse(file)
  return parsedFile[configName]
}

module.exports = readConfig
