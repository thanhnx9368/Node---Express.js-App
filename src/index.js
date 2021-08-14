const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes/index')
const port = 3000
const app = express()

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

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Route init
route(app)

app.listen(port, () => console.log(` http://localhost:${port}`))
