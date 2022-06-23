const express = require('express')
const passport = require('passport')
const router = express.Router()
const userController = require('../app/controllers/UsersController')

router.get('/loginform', userController.loginform)

router.post('/login', passport.authenticate('local'), userController.login)
router.get('/signup', userController.signup)
router.post('/signup', userController.register)
router.patch('/', userController.update)
router.patch('/change', userController.changePassword)
router.patch('/forgot', userController.forgotPassword)
router.get('/logout', userController.logout)
router.get('/', userController.index)

module.exports = router