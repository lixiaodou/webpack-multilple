var glob = require('glob')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')

// 多页面打包
if (config.multiple && config.multiple.mulipleFlag) {
    var viewPath = config.multiple.viewPath
    var jsPath = config.multiple.jsPath
    var viewEntries = glob.sync(`${viewPath}/**/*.html`)
    var jsEntries = glob.sync(`${jsPath}/**/*.js`)
    var viewBase = path.join(viewPath)
    var jsBase = path.join(jsPath)
    var htmlWebpackPlugin = []
    var entries = {}

    viewEntries.forEach(view => {
        dirname = path.dirname(view);//当前目录
        extname = path.extname(view);//后缀
        basename = path.basename(view, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        var key = pathname.replace(viewBase, jsBase).replace(/\\/g, '.')
        console.log('view', view)
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            filename: path.basename(view),
            template: view,
            chunks: [key]
        }))
        // entries[pathname] = entry;
    })

    jsEntries.forEach(jsItem => {
        dirname = path.dirname(jsItem);//当前目录
        extname = path.extname(jsItem);//后缀
        basename = path.basename(jsItem, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        var key = pathname.replace(/\\/g, '.')
        entries[key] = jsItem
        // entries[pathname] = entry;
    })
   module.exports = {
    entries: entries,
    htmlWebpackPlugin: htmlWebpackPlugin 
   } 

} else {
    var mainFile = config.multiple && config.multiple.main
    module.exports = {
        entries: {
            app: mainFile || './src/main.js'
        },
        htmlWebpackPlugin: [new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'index.html'
        })]
    }
}
