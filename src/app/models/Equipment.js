const mongoose = require('mongoose')
const EquipmentSchema = new mongoose.Schema({
    employeeName: {
        type: String
    },
    occupation: {
        type: String
    },
    imageName: {
        type: String
    },
    imageFile: {
        type: String
    },
    imageSrc: {
        type: String
    }
})

module.exports = mongoose.model('Equipments', EquipmentSchema)
