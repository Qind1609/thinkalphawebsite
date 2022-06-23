const mongoose = require('mongoose')
const MemberSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Members', MemberSchema)
