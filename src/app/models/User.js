const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')

const User = new Schema(
  {
    firstName: { type: String, maxLength: 255 },
    lastName: { type: String, maxLength: 600 },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    repeat_password: { type: String },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
  },
)
mongoose.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('User', User)
