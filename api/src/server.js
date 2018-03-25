const Koa = require('koa')
const router = require('koa-router')()
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

router.get('/api/', (ctx) => {
  ctx.body = 'HI UK WTF CAR'
})

app.use(router.routes())

/* app.use(async ctx => {
  ctx.body = { foo: 'CARL' }
}) */

app.listen(3000)
