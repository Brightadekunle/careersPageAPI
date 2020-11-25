const mongoose = require('mongoose')
const Schema = mongoose.Schema


const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    otherInfo: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        expires: 0
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }

})

module.exports = mongoose.model('Job', jobSchema)