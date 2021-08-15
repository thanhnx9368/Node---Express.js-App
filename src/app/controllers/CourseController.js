const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose')

const Course = require('../models/Course')
class CourseController {
  create(req, res, next) {
    res.render('modules/course/create')
  }

  store(req, res, next) {
    const payload = {
      ...req.body,
      image: `http://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`,
    }
    Course.create(payload)
      .then(() => res.redirect('/'))
      .catch(next)
  }

  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render('modules/course/show', {
          course: mongooseToObject(course),
        }),
      )
      .catch(next)
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('modules/course/edit', {
          course: mongooseToObject(course),
        })
      })
      .catch(next)
  }

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then((sucess) => res.redirect('modules/me/course/index'))
      .catch(next)
  }

  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then((sucess) => res.redirect('back'))
      .catch(next)
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  handleFormAction(req, res, next) {
    const { action, courseIds } = req.body
    switch (action) {
      case 'delete':
        Course.delete({ _id: { $in: courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      case 'restore':
        Course.restore({ _id: { $in: courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      case 'force-delete':
        const transformCourseIds = courseIds.split(',')
        Course.deleteMany({ _id: { $in: transformCourseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break
      default:
        res.json({ message: 'invalid action!!' })
    }
  }
}

module.exports = new CourseController()
