var merge = require('webpack-merge') // 可以把分开配置的config合并，分开生产环境和调试环境 @TODO
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
