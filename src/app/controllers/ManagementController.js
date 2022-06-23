const User = require('../models/User')

class UserController {
    // [GET] /user/management
    index(req, res, next) {
        User.find().select('-__v -hash -salt')
            .then(user => res.json(user))
            .catch(error => res.json(error))
    }
    // [PATCH] /user/management
    authorization(req, res, next) {
        console.log(req.body)
        User.findByIdAndUpdate(req.body._id, {
            role: req.body.role
        })
            .then(user => res.json({ state: "update Successful" }))
            .catch(error => res.json({ error }))
    }
}
module.exports = new UserController
