const Koa = require('koa')
const cors = require('koa-cors')
const json = require('koa-json')

const app = new Koa()

app.use(cors())
app.use(json())
// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response

app.use(async ctx => {
  ctx.body = { foo: 'CAR' }
})

app.listen(3000)
