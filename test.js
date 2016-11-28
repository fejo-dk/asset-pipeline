const tape = require('tape')

tape.test('Compile JS', (t) => {
  let resultFilePath

  exec('rm -rf fixtures/build/assets fixtures/build/manifests/javascript.json')
  .then(() => {
    return exec('node ../bin/compile-js.js', {
      cwd: 'fixtures'
    })
  }).then(() => {
    return readFile('fixtures/build/manifests/javascript.json')
  }).then((data) => {
    let assetPathPattern = /^\/assets\/(sandbox-.*\.js)$/
    let resultDeliveryPath = JSON.parse(data)['sandbox.js']
    t.ok(assetPathPattern.test(resultDeliveryPath), 'the resulting path in the manifest should be well formed')
    let resultFileName = assetPathPattern.exec(resultDeliveryPath)[1]
    resultFilePath = `fixtures/build/assets/javascripts/${resultFileName}`
    return readFile(resultFilePath)
  }).then((rawJS) => {
    let js = rawJS.toString()
    t.notOk(js.includes('=>'), 'the resulting JS should not contain any arrow functions')
    t.notOk(js.includes('`'), 'the resulting JS should not contain any template strings')
    return exec(`node ${resultFilePath}`)
  }).then((stdout) => {
    t.equal(stdout, 'Hello world\n', 'the resulting JS should log `Hello World`')
    t.end()
  }).catch((err) => {
    t.error(err)
  })
})

function readFile (path) {
  const fs = require('fs')

  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        return reject(err)
      }

      return resolve(fileContent)
    })
  })
}

function exec (command, options) {
  const childProcess = require('child_process')

  return new Promise((resolve, reject) => {
    childProcess.exec(command, options, (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }

      return resolve(stdout, stderr)
    })
  })
}
