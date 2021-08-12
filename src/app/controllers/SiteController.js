const { multipleMongooseToObject } = require('../../utils/mongoose')

const Course = require('../models/Course')
class SiteController {
  index(req, res, next) {
    // Course.find({}, function(err, courses) {
    //   if (err) {
    //     res.status(400).json({error: 'EROR!!!'})
    //     return
    //   }

    //   return res.json(courses)
    // })

    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: multipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }

  show() {}
}

module.exports = new SiteController()
