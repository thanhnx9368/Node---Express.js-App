const Course = require('../models/Course')
class NewsController {
  index(req, res) {
    console.log('kaka3')

    // return res.render('news')

    Course.find({}, function (err, courses) {
      if (err) {
        res.status(400).json({ error: 'EROR!!!' })
        return
      }

      res.json(courses)
    })
  }

  show() {}
}

module.exports = new NewsController()
