const path = require('path')
//生成一个html页面，同时将我们React编译完的代码注入到这个html里面，并且文件的名字路径都是根据webpack.config.js文件中的配置生成的
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'app_[hash].js',
        //静态资源引用路径
        publicPath: ''
    },
    module: {
        rules: [
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
    plugins: [
        new HTMLPlugin()
    ]
}