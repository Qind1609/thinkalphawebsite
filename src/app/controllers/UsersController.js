const User = require('../models/User')
const crypto = require('crypto')
const genPassword = require('../../lib/passport').genPassword
const validPassword = require('../../lib/passport').validPassword
const registerEmail = require('../../lib/nodemailer').registerEmail
const forgotPasswordEmail = require('../../lib/nodemailer').forgotPasswordEmail
const createUserPassword = require('../../lib/crypto').createUserPassword

class UserController {

    loginform(req, res, next) {
        res.render('users/signup')
    }
    
    // [GET] /user
    index(req, res) {console.log(req);
        if (!req.user) {
            res.json({ role: 'guest' })
        } else {
            const toClient = {
                _id: req.user._id,
                givenname: req.user.givenname,
                familyname: req.user.familyname,
                username: req.user.username,
                role: req.user.role,
                phone: req.user.phone,
                address: req.user.address
            }
            res.json(toClient)
        }
    }

    // [GET] /user/management
    getAllUsers(req, res) {
        User.find()
            .then(user => res.json(user))
            .catch(error => res.json(error))
    }

    //[POST] /user/forgot
    forgotPassword(req, res) {
        const userPassword = createUserPassword()
        User.findOneAndUpdate({ username: req.body.username }, { salt: userPassword.salt, hash: userPassword.hash })
            .then(user => {
                if (user) {
                    forgotPasswordEmail(user, userPassword.randomPassword)
                } else {
                    res.status(404).send('username does not exist')
                }
            })
    }

    // [POST] /user/login
    login(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/user')
        }
    }

    //[GET] /user/signup
    signup(req, res, next) {
        res.render('users/signup')
    }

    //[POST] /user/signup
    register(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    res.status(403).send('Username is already exist')
                } else {
                    const userPassword = createUserPassword()
                    const newUser = new User({
                        username: req.body.username,
                        salt: userPassword.salt,
                        hash: userPassword.hash,
                    })
                    newUser.save()
                    registerEmail(newUser, userPassword.randomPassword)
                    res.redirect('/user')
                }
            })
    }

    // [PATCH] /user/update
    update(req, res, next) {
        // console.log('update', req.body)
        User.findByIdAndUpdate(req.body._id, {
            givenname: req.body.givenname,
            familyname: req.body.familyname,
            phone: req.body.phone,
            address: req.body.address,
            client_email: req.body.client_email,
            private_key: req.body.private_key
        })
            .catch(error => res.json({ error }))
    }

    // [PATCH] /user/change
    changePassword(req, res) {    // this function validate password user
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user == null) {
                    res.status(401).send('Incorrect username or password')
                }
                if (user) {
                    const isValid = validPassword(req.body.password, user.hash, user.salt)
                    if (isValid && user.email_verified) {
                        const saltHash = genPassword(req.body.newpassword)
                        User.findOneAndUpdate({ username: user.username }, { hash: saltHash.hash, salt: saltHash.salt })
                            .then(user => console.log(user))
                    } else {
                        res.status(401).send('Incorrect username or password')
                    }
                }
            })
            .catch(error => console.log(error))
    }

    //[GET] /user/logout
    logout(req, res, next) {
        req.logout()
        res.redirect('/user')
    }
}

module.exports = new UserController
