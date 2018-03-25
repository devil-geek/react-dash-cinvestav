const router = require('koa-router')({
  prefix: '/api'
})

router
  .get('/', (ctx, next) => {
    ctx.body = 'HI API'
  })

module.exports = router.routes()
