const mongoose = require('mongoose')
const ResearchSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Researchs', ResearchSchema)
