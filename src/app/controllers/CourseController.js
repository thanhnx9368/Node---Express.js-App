const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose')

const Course = require('../models/Course')
class CourseController {
  // index(req, res, next) {

  //   Course.find({})
  //     .then((courses) => {
  //         res.render('home', {
  //         courses: multipleMongooseToObject(courses)
  //       })
  //     }).catch(next)
  // }

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
}

module.exports = new CourseController()
