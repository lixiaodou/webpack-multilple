require('./check-versions')()

var path = require('path')
var vcsVersion = require('./version')

var files = path.join(__dirname, '..', 'package.json')
// 编译添加主版本号
vcsVersion(files, 'minor')
