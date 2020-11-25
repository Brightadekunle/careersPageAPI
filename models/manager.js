const mongoose = require('mongoose')
const Schema = mongoose.Schema


const managerSchema = new Schema({
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
    phoneNumber: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Manager', managerSchema)