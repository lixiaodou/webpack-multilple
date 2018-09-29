var path = require('path')
var utils = require('./utils')
var config = require('../config')
var multipleConfig = require('./multiple-config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: multipleConfig.entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js', // 输出文件的名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // html中引用了img等，需要用到这个配置
//       {
//         test: /\.html$/,
//         use: [{
//           loader: 'html-loader',
//           options: {
//             minimize: true
//           }
//         }],
//       },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(js)$/,
        loader: 'eslint-loader', // 这个的作用可以加强团队的代码规范，最好不要去掉
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  }
}
