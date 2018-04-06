require('./check-versions')()

var fs = require('fs')
var semver = require('semver')
// var path = require('path')
// process.env.DM_ENV = 'production'

// Increment a version by the specified level.  Level can
// be one of: major, minor, patch, premajor, preminor,
// prepatch, or prerelease.  Default level is 'patch'.
// Only one version may be specified.

module.exports = function (files, strIncrement) {
  // var strIncrement = 'patch'
  // var files = path.join(__dirname, '..', 'package.json')
  var arrFiles = []
  if (typeof files === 'string' || files instanceof String) {
    arrFiles = [files]
  } else {
    arrFiles = files || []
  }
  arrFiles.forEach(function (file) {
    // var json = self.increment(file)
    var json = require(file)
    var versions = semver.clean(json.version)
    versions = semver.inc(versions, strIncrement)
    json.version = versions
    console.log(`Build ${strIncrement} Version ${json.version}`)
    // fs.writeFile(file, JSON.stringify(json, null, 2))
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  })
}
