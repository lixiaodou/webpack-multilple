var path = require('path')

module.exports = {
  multiple: {
    mulipleFlag: true,
    viewPath: './src/views',
    jsPath: './src/js/apps',
    main: './src/main.js' // 针对单页面应用 
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'scripts/static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 58080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/dev': {// 代理的地址
        target: 'http://dev-x1.idata.oa.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: function (path, req) {
          return path.replace('/dev', '')
        },
        headers: {
          cookie: 'pgv_pvi=2787001344; t_u=f18dd7e67e355061%7C7c1e82719de646fe; TCOA_TICKET=0C7DE0CEB8C2C798799AC93CF69427D7D10AB1CACC688C296745ADE592A5704B971D3437AF67985A89DBB42E9235A41DDE78E79A14094EE6AC0EAF9EA6CD6EC9CC1F98E4E106CBC7943C78C6A865A66F33216E6C0B9C7B2D80BEEAB22908D67BF65264114CB34C7A29C36E4B7B6F1E161A255241EFBAA6859F988FCA207A82FB171FC6AD4FFC4218E183AFA7461224FA7B42593EA0893406B9C312F6B413FB243133EB47BD4EA3E6; TCOA=bstG4d2cDc; pgv_pvid=1448108072; RIO_TCOA_TICKET=tof:0C7DE0CEB8C2C79821925DE1877A978978373163E7C84DC00DADDEA0C35A4C50965FC4609F794193719D37A536BF17A004660F07C9699BCFCB82947FAAB3C61B74CDADBC2089425EA48E2AD988496F852BBBAB21580CCF873B9FB279B51E0732B18149F3A6934E326CEA29EDEBE9C5D45BB7435702106C364928E851154DF8D5158E6C3CAE98C81B50DB72B2F829AA1FABBCF0A82DEA3670CE1BBAC5C6981BAC704B2167DDF917150B796A400837014B17282299D1A043FA7DC3689FECFC5F2D4C3794686A7058F1; PHPSESSID=4ae9e08c8ae113fb85f0d46fa562ef8a; x_host_key=1623d3328ad-f9883dc87522dc71880fb6379c3d023a1c104e0d; x-host-key-oaback=1623d71144e-42a112bf5e8de0ce71656a17582e77c1cdbb11e2',
          host: 'dev-x1.idata.oa.com',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, X-CSRF-TOKEN',
          Accept: 'application/json, text/plain, */*'
        }
      }
    },
    testData: 'test/data',
    cssSourceMap: false
  }
}
