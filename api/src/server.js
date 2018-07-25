const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const json = require('koa-json')
const app = new Koa()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')

const port = process.env.PORT || 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true })

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
app.use(bodyParser())
app.use(cors())
app.use(json())

// logger middleware
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

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
