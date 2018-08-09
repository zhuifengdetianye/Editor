const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      // 识别React
      {
        test: /.jsx$/,
        use: ['babel-loader']
      },
      {
        test: /.js$/,
        use: ['babel-loader'],
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    //静态资源引用路径
    publicPath: '/public/',
  },
  //配置寻找模块的规则
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
