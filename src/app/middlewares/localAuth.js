const LocalStrategy = require('passport-local').Strategy
const validPassword = require('../../lib/passport').validPassword
const passport = require('passport')
const User = require('../models/User')

strategy = new LocalStrategy(
    function (username, password, done) {    // this function validate password user
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    console.log('Incorrect username or password')
                }
                if (user) {
                    const isValid = validPassword(password, user.hash, user.salt)
                    if (isValid) {
                        done(null, user)
                    } else {
                        console.log('Incorrect username or password')
                        done(null, false)
                    }
                }
            })
            .catch(error => done(error))
    })

passport.use(strategy)