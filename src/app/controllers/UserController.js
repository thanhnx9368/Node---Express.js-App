const { multipleMongooseToObject } = require('../../utils/mongoose')

const User = require('../models/User')
class UserController {
  async index(req, res, next) {
    try {
      const data = await User.find({})
      return res.status(200).json({ data })
    } catch (err) {
      next(err)
    }
  }

  async trash(req, res, next) {
    try {
      const data = await User.findDeleted({})
      return res.status(200).json({ data })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const user = new User(req.body)
      await user.save()
      return res.status(201).json({ user })
    } catch (next) {}
  }

  async delete(req, res, next) {
    try {
      const user = await User.delete({ _id: req.body._id })
      return res.status(200).json({ message: 'success!!' })
    } catch (next) {}
  }

  async restore(req, res, next) {
    try {
      const user = await User.restore({ _id: req.body._id })
      return res.status(200).json({ message: 'success!!' })
    } catch (next) {}
  }

  async forceDelete(req, res, next) {
    try {
      const user = await User.deleteOne({ _id: req.body._id })
      return res.status(200).json({ message: 'force delete success!!' })
    } catch (next) {}
  }

  async update(req, res, next) {
    try {
      await User.updateOne({ _id: req.body._id }, req.body)
      const user = await User.find({ _id: req.body._id })
      return res.status(200).json({ user }).catch(next)
    } catch (next) {}
  }
}

module.exports = new UserController()
