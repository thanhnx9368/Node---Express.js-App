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
}

module.exports = new meController()
