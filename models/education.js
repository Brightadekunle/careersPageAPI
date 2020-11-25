const mongoose = require('mongoose')
const Schema = mongoose.Schema


const educationSchema = new Schema({
    school: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant"
    },
})

module.exports = mongoose.model('Education', educationSchema)