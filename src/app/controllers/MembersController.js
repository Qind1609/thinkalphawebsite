const Member = require('../models/Member')
const fs = require('fs')
const path = require('path')

class MembersController {

    // [GET] /member
    index(req, res, next) {
        Member.find({})
            .then(member => {
                res.json(member)
            })
            .catch(err => next(err))
    }
    // [POST] member
    create(req, res, next) {
        const newMember = new Member({
            employeeName: req.body.employeeName,
            occupation: req.body.occupation,
            imageName: req.file.originalname
        })
        newMember.save()
        res.json({ status: 'Create successfully' })
    }

    // [DELETE] member/:id
    delete(req, res, next) {
        Member.findById(req.params.id)
            .then(member => fs.unlink(path.join( __dirname, '..', '..', 'public', 'members', member.imageName), (error) => console.log(error))
            )
        Member.deleteOne({ _id: req.params.id })
            .then(res.json({ state: 'success' }))
            .catch(error => res.json({ state: error }))
    }

    // [PUT] member/:id
    update(req, res, next) {
        Member.findById(req.body._id)
            .then(
                member => {
                    console.log('member', member.imageName)
                    fs.unlink(path.join(__dirname, '..', '..', 'public', 'members', member.imageName), (error) => console.log(error))
                }
            )
            .catch(error => { console.log(error) })
        Member.findByIdAndUpdate(req.body._id, {
            employeeName: req.body.employeeName,
            occupation: req.body.occupation,
            imageName: req.file.originalname
        })
            .catch(error => console.log(error))
    }
}
module.exports = new MembersController
