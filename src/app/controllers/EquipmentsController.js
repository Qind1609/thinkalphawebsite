const Equipment = require('../models/Equipment')
const fs = require('fs')
const path = require('path')

class EquipmentsController {

    // [GET] /equipment
    index(req, res, next) {
        Equipment.find({})
            .then(equipment => {
                res.json(equipment)
            })
            .catch(err => next(err))
    }
    // [POST] equipment
    create(req, res, next) {
        const newEquipment = new Equipment({
            employeeName: req.body.employeeName,
            occupation: req.body.occupation,
            imageName: req.file.originalname
        })
        newEquipment.save()
        res.json({ status: 'Create successfully' })
    }

    // [DELETE] equipment/:id
    delete(req, res, next) {
        Equipment.findById(req.params.id)
            .then(equipment => fs.unlink(path.join(__dirname, '..', '..', 'public', 'equipments', equipment.imageName), (error) => console.log(error))
            )
        Equipment.deleteOne({ _id: req.params.id })
            .then(res.json({ state: 'success' }))
            .catch(error => res.json({ state: error }))
    }

    // [PUT] equipment/
    update(req, res, next) {
        if (req.file == undefined) {
            Equipment.findByIdAndUpdate(req.body._id, {
                employeeName: req.body.employeeName,
                occupation: req.body.occupation,
            })
                .then(res.json({}))
                .catch(error => console.log(error))
        }
        else {
            Equipment.findByIdAndUpdate(req.body._id, {
                employeeName: req.body.employeeName,
                occupation: req.body.occupation,
                imageName: req.file.originalname
            })
                .then(equipment => {
                    fs.unlink(path.join(__dirname, '..', '..', 'public', 'equipments', equipment.imageName), (error) => console.log(error))
                    res.json({})
                })
                .catch(error => console.log(error))
        }
    }
}
module.exports = new EquipmentsController
