module.exports = function (app, express) {
  var path = require('path')
  var bodyParser = require('body-parser')
  var os = require('os')// 操作系统的一些信息
  var oUser = os.userInfo()
  var Hashids = require('hashids')
  var SecSystemId = 953
  var hashids = new Hashids([oUser.username, SecSystemId].join(''), 10)
  const url = require('url')
  var strAuthKey = hashids.encode(SecSystemId)

  // for parsing application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: true }))
  // for parsing application/json
  app.use(bodyParser.json())

  app.use(function (req, res, next) {
    // res.setHeader('X-Auth-Key', Math.random().toString(36).substring(7))
    res.setHeader('X-Auth-Key', strAuthKey)
    res.setHeader('X-Auth-User', oUser.username)
    // DE developer
    res.setHeader('X-Auth-Role', 'DE')
    // res.append('X-Auth-User', oUser.username);
    // res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })

  app.head('/', (req, res, next) => {
    // console.log('auth method called')
    res.send('OK')
  })

  app.all('/file/:pkg/:func', function (req, res, next) {
    var options = {
      root: path.resolve(__dirname, '../test/data'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    var strPackage = req.params.pkg
    var func = req.params.func
    var fileName = [strPackage, '/', func, '.json'].join('')
    res.sendFile(fileName, options, function (err) {
      if (err) {
        res.json({ code: 1, codeInfo: '', data: req.body, params: req.params })
        next(err)
        // next('{"code": 1, "codeInfo": "", "data": req.body, params: req.params}')
      } else {
        // console.log('Sent:', fileName)
      }
    })
  })
}
