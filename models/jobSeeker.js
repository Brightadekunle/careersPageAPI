const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSeekerSchema = new Schema({
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
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('jobSeeker', jobSeekerSchema)