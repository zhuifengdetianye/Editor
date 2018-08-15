const serialize = require('serialize-javascript')
const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const Helmet = require('react-helmet').default
const ReactDomServer = require('react-dom/server')

const getStoreState = (stores) => {
  // Object.keys()返回对象属性key所组成的数组，同时，注意reduce的用法
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

// 参数bundle需要，因为服务端渲染需要bundle，而后是template，我们需要template把html的内容渲染进去
module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url)

    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })
      res.send(html)
      // res.send(template.replace('<!-- app -->', content))
      resolve()
    }).catch(reject)
  })
}
