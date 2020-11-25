const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Time of listing and experience should be reviewed
const applicantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    placeOfWork: {
        type: String,
        required: true
    },
    locationOfWorkplace: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category" 
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job" 
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager" 
    }
})

module.exports = mongoose.model('Applicant', applicantSchema)