const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Course', Course)
