const path = require('path')
//生成一个html页面，同时将我们React编译完的代码注入到这个html里面，并且文件的名字路径都是根据webpack.config.js文件中的配置生成的
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: 'app_[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ],
  devtool: 'source-map'
})

//localhost:8888/filename
if (isDev){
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    //查看devServer文档
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase:path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
