require('./check-versions')()

var fs = require('fs')
var semver = require('semver')

module.exports = function (files, strIncrement) {
  var arrFiles = []
  if (typeof files === 'string' || files instanceof String) {
    arrFiles = [files]
  } else {
    arrFiles = files || []
  }
  arrFiles.forEach(function (file) {
    var json = require(file)
    var versions = semver.clean(json.version)
    versions = semver.inc(versions, strIncrement)
    json.version = versions
    console.log(`Build ${strIncrement} Version ${json.version}`)
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  })
}
