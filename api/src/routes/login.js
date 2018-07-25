let Users = require('../models/users')

const router = require('koa-router')({
  prefix: '/api/login'
})

router
  .post('/', async (ctx, next) => {
    let user = await Users.findOne({email: ctx.request.body.email})
    if (!user) {
      ctx.throw(401, 'User not found')
    }
    const match = await user.validatePassword(ctx.request.body.password)
    if (!match) {
      ctx.throw(401, 'Wrong user or password')
    }
    ctx.state.user = user.toPublic()
    ctx.body = user.toPublic()
  })

module.exports = router.routes()
