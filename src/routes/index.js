const newsRouter = require('./news')
const siteRouter = require('./site')
const courseRouter = require('./course')
const meRouter = require('./me')
const userRouter = require('./user')

function route(app) {
  app.use('/courses', courseRouter)
  app.use('/me', meRouter)
  app.use('/news', newsRouter)
  app.use('/', siteRouter)

  //Users

  app.use('/users', userRouter)
}

module.exports = route
