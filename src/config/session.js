const MongoStore = require('connect-mongo')

sessionConfig = {
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ThinkAlpha_dev' }),
    cookie: { 
      maxAge: 1000 * 60 
     }
  }

module.exports = sessionConfig
