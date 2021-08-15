const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose')

const Course = require('../models/Course')
class meController {
  index(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()]).then(
      ([courses, countDocumentDeleted]) => {
        res.render('modules/me/course', {
          courses: multipleMongooseToObject(courses),
          countDocumentDeleted,
        })
      },
    )
  }

  trash(req, res, next) {
    Course.findDeleted({}).then((courses) => {
      res.render('modules/me/course/trash', {
        courses: multipleMongooseToObject(courses),
      })
    })
  }
}

module.exports = new meController()
