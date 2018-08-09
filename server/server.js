const express = require('express')
const ReactDOMServer = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')


const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
    //引入服务端生成的代码
    const serverEntry = require('../dist/server-entry').default

    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

    //express.static()负责托管express应用中的静态资源，它的第一个参数是静态资源文件所在的根目录
    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('*', function (req, res) {
        const appString = ReactDOMServer.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->', appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, function () {
    console.log('listening on 3333')
})
