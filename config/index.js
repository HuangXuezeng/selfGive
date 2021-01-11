'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/kukacmsIndex/',
    assetsPublicPath: '/',
    proxyTable: {
			'/kukacms': {
        // target: 'http://172.16.28.85:7080/kukacms',
        // target: 'http://192.168.249.18:7020/kukacms', //测试库
        // target: 'http://family.kukahome.com:5080/kukacms/',
        // target: 'http://kukacms.kukahome.com:8084/kukacms', //事业伙伴
        target: 'http://kukacms.kukahome.com:8082/kukacms', //正式库
        //target: 'http://172.16.26.125:9090'
        changeOrigin: true,
        pathRewrite: {
          '^/kukacms': ''
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: '172.16.28.123',
    // host: 'localhost'≥
    port: 8082, // can be 表v'fdsavcv overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../kukacmsIndex/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../kukacmsIndex'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
