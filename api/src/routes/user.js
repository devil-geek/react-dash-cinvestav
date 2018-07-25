let Users = require('../models/users')
const router = require('koa-router')({
  prefix: '/api/users'
})

router
  .post('/', async (ctx, next) => {
    let user = await Users.findOne({ email: ctx.request.body.email })
    if (user) {
      ctx.throw(401, 'Email is already taken')
    }
    user = new Users({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      type: ctx.request.body.perday
    })

    await user.save()

    if (!user) {
      ctx.throw(401, 'User not created')
    }

    ctx.body = user.toPublic()
  })
  .get('/', async (ctx, next) => {
    let users = await Users.find()
    if (!users) {
      ctx.throw(401, 'No users registered')
    }

    users = users.map(item => {
      return item.toPublic()
    })

    ctx.body = users
  })

module.exports = router.routes()
