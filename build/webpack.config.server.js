const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = webpackMerge(baseConfig, {
  //构建出针对不同运行环境的代码，这里是node
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    //打包出来的模块方案
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map'
})
