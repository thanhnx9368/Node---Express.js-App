// Config env
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes/index')
const app = express()
const port = 3000
const path = require('path')
const methodOverride = require('method-override')

// Method override
app.use(methodOverride('_method'))

// Connect to DB
const db = require('./config/db')
db.connect()

// Read static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// HTTP logger
app.use(morgan('combined'))

// Custom middlewares
const softMiddleware = require('./app/middlewares/softMiddleware')
app.use(softMiddleware)

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: require('./helpers/sortable'),
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Route init
route(app)

// Catch 404 error and forward to the error handler
app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

// Error handler function
app.use((err, req, res, next) => {
  // const error = app.get('env') == 'development' ? err : {}
  const error = app.get('env') == 'development' ? err : {}
  const status = err.status || 500

  return res.status(status).json({
    error: {
      message: error.message,
    },
  })
})

// Start the server
app.listen(port, () =>
  console.log(`Server is listening on: http://localhost:${port}`),
)
