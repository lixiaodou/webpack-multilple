require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora') // 类似一个promise
var rm = require('rimraf') // 用来删除文件和文件夹的，不管文件夹是否为空，都可删除
var chalk = require('chalk') // 改变控制台输出颜色
var webpack = require('webpack')
var path = require('path')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

// 这里删除
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
