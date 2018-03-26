const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const json = require('koa-json')
const app = new Koa()
const settings = require('../../config.json')
const serve = require('koa-static')
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')

  const webpack = require('webpack')
  const config = require('../../webpack.dev')
  const compiler = webpack(config)

  const devMiddleware = require('koa-webpack-dev-middleware')(
    compiler,
    config.devServer
  )
  const hotMiddleware = require('koa-webpack-hot-middleware')(
    compiler
  )

  app.use(devMiddleware)
  app.use(hotMiddleware)
}

app.use(serve('dist'))

app.use(cors())
app.use(json())

fs.readdirSync(path.join(__dirname, 'routes'))
  .filter(function (module) {
    return module
  })
  .forEach(function (module) {
    app.use(require(path.join(__dirname, 'routes', module)))
  })

const server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
