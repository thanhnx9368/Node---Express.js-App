const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes/index')
const port = 3000

const app = express()

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
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
  res.render('home')
})

// Route init
route(app)

app.listen(port, () => console.log(` http://localhost:${port}`))
