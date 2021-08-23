const { multipleMongooseToObject } = require('../../utils/mongoose')

const User = require('../models/User')
const Course = require('../models/Course')
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
      const user = await User.delete({ _id: req.params.userId })
      return res.status(200).json({ message: 'success!!' })
    } catch (next) {}
  }

  async restore(req, res, next) {
    try {
      const user = await User.restore({ _id: req.params.userId })
      return res.status(200).json({ message: 'success!!' })
    } catch (next) {}
  }

  async forceDelete(req, res, next) {
    try {
      const user = await User.deleteOne({ _id: req.params.userId })
      return res.status(200).json({ message: 'force delete success!!' })
    } catch (next) {}
  }

  async update(req, res, next) {
    try {
      await User.updateOne({ _id: req.params.userId }, req.body)
      const user = await User.find({ _id: req.params.userId })
      return res.status(200).json({ user }).catch(next)
    } catch (next) {}
  }

  async createUserCourse(req, res, next) {
    try {
      const { userId } = req.params
      const user = await User.findOne({ _id: userId })

      const payload = {
        ...req.body,
        image: `http://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`,
      }
      const course = new Course(payload)
      course.owner = user._id
      await course.save()

      user.courses.push(course)
      await user.save()

      res.status(201).json({ course })
    } catch (err) {
      next(next)
    }
  }

  async getUserCourse(req, res, next) {
    try {
      const { userId } = req.params

      // get courses by polulate
      const user = await User.findById(userId).populate('courses')
      const courses = user.courses

      //get courses by query
      // const courses = await Course.find({ _id: { $in: user.courses } })

      res.status(200).json({ data: courses })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()
