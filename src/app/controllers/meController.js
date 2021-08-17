const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../utils/mongoose')

const Course = require('../models/Course')
class meController {
  index(req, res, next) {
    const { column, type, enabled } = res.locals._sort
    const courseQuery = !enabled
      ? Course.find({})
      : Course.find({}).sort({ [column]: type })

    Promise.all([courseQuery, Course.countDocumentsDeleted()]).then(
      ([courses, countDocumentDeleted]) => {
        res.render('modules/me/course', {
          courses: multipleMongooseToObject(courses),
          countDocumentDeleted,
        })
      },
    )
  }

  trash(req, res, next) {
    const { column, type, enabled } = res.locals._sort
    const courseQuery = !enabled
      ? Course.findDeleted({})
      : Course.findDeleted({}).sort({ [column]: type })
    courseQuery.then((courses) => {
      res.render('modules/me/course/trash', {
        courses: multipleMongooseToObject(courses),
      })
    })
  }
}

module.exports = new meController()
