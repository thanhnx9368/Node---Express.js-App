const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')
const bcrypt = require('bcryptjs')

const User = new Schema(
  {
    firstName: { type: String, maxLength: 255 },
    lastName: { type: String, maxLength: 600 },
    email: { type: String, required: true, unique: true, lowcase: true },
    password: { type: String },
    authType: {
      type: String,
      enum: ['local', 'facebook', 'google'],
      default: 'local',
    },
    googleId: { type: String },
    facebookId: { type: String },
    image: { type: String },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
  },
)

User.pre('save', async function (next) {
  try {
    if (this.authType != 'local') {
      return next()
    }
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(this.password, salt)
    this.password = passwordHash
    next()
  } catch (err) {
    next(err)
  }
})

User.methods.verifyPassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password)
  } catch (err) {
    next(err)
  }
}

mongoose.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('User', User)
