require('dotenv').config()
const express = require('express')
const app = express();

const morgan = require('morgan')

const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const sessionConfig = require('./config/session')

const passport = require('passport')
require('./config/passport')
require('./app/middlewares/localAuth')

// custom
const route = require('../src/routes/index')
const db = require('./config/mongoose')
const path = require('path')
const port = 5000

// session
app.use(session(sessionConfig))

// use middleware for encode POST method
app.use(morgan('tiny'))
app.use(cors({
  origin: 'http://localhost:3006',
  methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'build')))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

var handlebars = require('express-handlebars');var hbs = handlebars.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'))

// connect to database
db.connect()

//passport
app.use(passport.initialize())
app.use(passport.session())

route(app)

//app.get('*', (req, res) => {
//  res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
//});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})