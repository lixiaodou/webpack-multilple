require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express') // 这个可以用来起本地服务和http服务类似
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var app = express()
// var localProxy = require('./local-proxy.js')(app, express)
var compiler = webpack(webpackConfig)
// webpack-dev-middleware就是干这个的，专业点叫做伺服器
// 而webpack-hot-middleware 是用来进行页面的热重载的(当代码修改了，浏览器的页面重新加载)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

require('./local-proxy.js')(app)
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  // app.use(proxyMiddleware(options))
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 暂时的理解为了方便单页面应用的链接问题(后面可以测试使用，单页面刷新的时候)
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// 热加载(当代码修改了，浏览器的页面重新加载)
app.use(hotMiddleware)

// serve pure static assets
// 为了提供对静态资源文件(图片、csss文件、javascript文件)的服务，请使用Express内置的中间函
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// console.log('devMiddleware.waitUntilValid', devMiddleware.waitUntilValid)
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
