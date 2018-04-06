var PORT = 8899;
// var ratgetUrl = 'http://loc-x1.idata.oa.com'
// var ratget = 'loc-x1.idata.oa.com'
var ratgetUrl = 'http://localhost:8080'
var ratget = 'localhost:8080'
// var devRatgetUrl = 'http://dev-x1.idata.oa.com'
// var devRatget = 'dev-x1.idata.oa.com'
var devRatgetUrl = 'http://pre-x1.idata.oa.com'
var devRatget = 'pre-x1.idata.oa.com'
// var ratgetUrl = 'http://x1.idata.oa.com'
// var ratget = 'x1.idata.oa.com'

var http = require('http')
var url = require('url')
var fs = require('fs')
var mine = require('./mine').types
var path = require('path')
var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer({
  target: ratgetUrl,   // 接口地址
  secure: true
})

var devProxy = httpProxy.createProxyServer({
  target: devRatgetUrl, // 接口地址
  secure: true
})

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'content-type': 'text/plain'
  })
  res.end('Something went wrong. And we are reporting a custom error message.')
})

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    'content-type': 'text/json'
  })
  // console.log('response.json', response)
  response.end(JSON.stringify({code: 1, codeInfo: '', data: response.body, params: response.params}))
  // response.end('hello world.')
})
server.listen(PORT)
console.log(`Server runing at port: ${PORT}`)
