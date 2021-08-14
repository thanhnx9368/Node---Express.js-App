const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose')

const Course = require('../models/Course')
class meController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('modules/me/course/index', {
          courses: multipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('modules/me/course/edit', {
          course: mongooseToObject(course),
        })
      })
      .catch(next)
  }

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then((sucess) => res.redirect('/'))
      .catch(next)
  }
}

module.exports = new meController()
