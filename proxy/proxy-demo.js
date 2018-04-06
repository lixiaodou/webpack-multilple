var PORT = 8080;
var ratgetUrl = 'http://loc-x1.idata.oa.com'
var ratget = 'loc-x1.idata.oa.com'
// var ratgetUrl = 'http://localhost:8080'
// var ratget = 'localhost:8080'
var devRatgetUrl = 'http://dev-x1.idata.oa.com'
var devRatget = 'dev-x1.idata.oa.com'
// var devRatgetUrl = 'http://pre-x1.idata.oa.com'
// var devRatget = 'pre-x1.idata.oa.com'
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
  var pathname = url.parse(request.url).pathname
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, X-CSRF-TOKEN');  
  request.headers.cookie = `t_u=f18dd7e67e355061%7C7c1e82719de646fe; t_uid=v_xiaodouli; pgv_pvi=2787001344; x-host-key-oaback=161638eae5b-7267e230da9b414441c3252688be5733d5ee0552; TCOA_TICKET=584AED416D015C0CB7CFA40C1D1288922C0ACF5B3236C8704F788D0E4399A985B49D0FF9ED61D1314CADCAB919680F09A6CEE10BF1518018DB700410D49FF172A2F016A61EA8316BB62ED45856F869E27AA4472EA5429545B7E9AD59ACAD8EBDF862B295D1953B0C39DF83D54EEC8D925E86B40C6EFAADAC8F932F53439541FE2A55EC8C3692B711952B7387BD096563084DA65A41839EE6515B9AA4CD5E0395185BD93F54B438A2; TCOA=SFW1yCTymU; RIO_TCOA_TICKET=tof:584AED416D015C0C4B9E77EB332BCA4CEC680E0B814C301064CD0A31F36695AC0ADC78ABFF9168317A2FBA7DBC043E1C242E18720CC2755D1F4F1A1D2D663571DFF73E8D14ED2598BB695C08B1182685BAFCEF99BDBB783F5444F2F3EAC7D45E4F658C3F6D650642AEDB2F996F9F4EAC7F51522FF60B929E023E430C781934BA8A49D2BC20181D6F7A90521C3E9018F5DCEC8F230D594A921B34B13F24EBB00B3F12855AADACA8AF50AD6CDEC5BB604DAADA3455691498BA5D62495C5F7209CFB217EFD7E8D01896; PHPSESSID=f266e99a50621c9c069c37fd3671768a; x_host_key=161639e684d-98c835b782ac481917cb9d120a45d384b0c3f9be`;
  request.headers.host = ratget
  proxy.web(request, response)
  // if (pathname.includes('/index_laravel.php')) {
  //   request.headers.host = ratget
  //   proxy.web(request, response)
  // } else {
  //   request.headers.host = devRatget
  //   devProxy.web(request, response)
  // }
})
server.listen(PORT)
console.log(`Server runing at port: ${PORT}`)
