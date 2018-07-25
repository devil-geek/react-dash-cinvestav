var mongoose = require('mongoose')
var Schema = mongoose.Schema
let bcrypt = require('bcrypt')
const saltRounds = 10
const uuidv4 = require('uuid/v4')

var users = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  type: { type: String, default: 'admin' },
  id: { type: String, default: uuidv4() }
})

users.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) {
    return next()
  }

  try {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  } catch (err) {
    return next(err)
  }

  return next()
})

users.methods.validatePassword = async function (password) {
  const isValid = await new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, compared) =>
      (err ? reject(err) : resolve(compared))
    )
  })
  return isValid
}

users.methods.toPublic = function () {
  return {
    name: this.name,
    email: this.email,
    type: this.type,
    id: this.id
  }
}

module.exports = mongoose.model('infoUsers', users)
