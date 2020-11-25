const mongoose = require('mongoose')
const Schema = mongoose.Schema


const experienceSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant"
    },
})

module.exports = mongoose.model('Experience', experienceSchema)