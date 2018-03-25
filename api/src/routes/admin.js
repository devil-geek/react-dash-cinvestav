const router = require('koa-router')({
  prefix: '/admin'
})
router
  .get('/', (ctx, next) => {
    ctx.body = 'HI Admin CAR'
  })

  .get('/my', (ctx, next) => {
    ctx.body = 'HI MY Admin'
  })

module.exports = router.routes()
