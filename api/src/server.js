const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const json = require('koa-json')
const app = new Koa()
const webpack = require('webpack')
const config = require('../../webpack.config.js')
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

app.use(cors())
app.use(json())

fs.readdirSync(path.join(__dirname, 'routes'))
  .filter(function (module) {
    return module
  })
  .forEach(function (module) {
    app.use(require(path.join(__dirname, 'routes', module)))
  })

app.listen(3000)
