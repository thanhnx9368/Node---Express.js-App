class NewsController {
  index(req, res) {
    return res.render('news')
  }

  show() {}
}

module.exports = new NewsController()
