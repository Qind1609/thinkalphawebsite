const MongoStore = require('connect-mongo')

sessionConfig = {
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:12345/ThinkAlpha_prod' }),
    cookie: { 
      maxAge: 1000 * 60 
     }
  }

module.exports = sessionConfig
