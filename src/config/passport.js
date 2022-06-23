const User = require('../app/models/User')
const passport = require('passport')

// Store user._id in cookies in session
passport.serializeUser((user,done) => {
    console.log('store user in session', user.id)
    done(null, user.id)
})

//user object attaches to the request as req.user   
passport.deserializeUser((userId, done) => {
    // done(null, userId)
    User.findById(userId)
    .then(user => {
        done(null, user)
    })
    .catch(err => done(err))
})
