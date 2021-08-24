const { multipleMongooseToObject } = require('../../utils/mongoose')
const { createToken } = require('../../utils/jwt')
const bcrypt = require('bcryptjs')

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

  async signUp(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (user)
        return res
          .status(403)
          .json({ error: { message: 'Email already exist!!' } })

      delete req.body.repeat_password
      const newUser = new User(req.body)
      await newUser.save()
      const token = createToken(newUser._id)

      res.setHeader('Authorization', token)
      res.status(201).json({ success: true })
    } catch (err) {}
  }

  async signIn(req, res, next) {
    try {
      const { _id } = req.user
      const token = createToken(_id)
      res.setHeader('Authorization', token)
      res.status(200).json({ success: true })
    } catch (err) {
      next(err)
    }
  }

  async verify(req, res, next) {
    res.status(200).json({ success: true })
  }

  async googleAuth(req, res, next) {
    const token = createToken(req.user._id)
    res.setHeader('Authorization', token)
    res.status(200).json({ success: true })
  }
}

module.exports = new UserController()
