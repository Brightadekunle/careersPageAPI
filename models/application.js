const mongoose = require('mongoose')
const Schema = mongoose.Schema


const applicationSchema = new Schema({
    dateApplied: {
        type: Date,
        default: 0
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        default: "Job"
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        default: "Applicant"
    }
})

module.exports = mongoose.model('Application', applicationSchema)