const Research = require('../models/Research')
const fs = require('fs')
const path = require('path')

class ResearchsController {

    // [GET] /research
    index(req, res, next) {
        Research.find({})
            .then(research => {
                res.json(research)
            })
            .catch(err => next(err))
    }

    // [GET] /research/one/:_id
    findOne(req, res, next) {
        Research.findById(req.params._id)
            .then(research => {
                res.json(research)
            })
            .catch(err => next(err))
    }

    // [POST] research
    create(req, res, next) {
        const newResearch = new Research({
            description: req.body.description
        })
        newResearch.save()
        res.json({ status: 'Create successfully' })
    }

    // [DELETE] research/:id
    delete(req, res, next) {
        Research.deleteOne({ _id: req.params.id })
            .then(res.json({ state: 'success' }))
            .catch(error => res.json({ state: error }))
    }

    // [PUT] research/
    update(req, res, next) {
        Research.findByIdAndUpdate(req.body._id, {
            description: req.body.description
        })
            .catch(error => console.log(error))
    }
}
module.exports = new ResearchsController
