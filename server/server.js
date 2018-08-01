const express = require('express')
const ReactDOMServer = require('react-dom/server')
//引入服务端生成的代码
const serverEntry = require('../dist/server-entry')

const app = express()

app.get('*', function (req, res) {
    const appString = ReactDOMServer.renderToString(serverEntry)
    res.send(appString)
})

app.listen(3333, function () {
    console.log('listening on 3333')
})