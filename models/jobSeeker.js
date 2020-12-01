const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/key')


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
    token: {
        type: String
    }
})


// generate token
jobSeekerSchema.methods.generateToken=function(token,cb){
    var user = this
    // var token = jwt.sign(user._id.toHexString, JWT_KEY)

    user.token = token
    user.save(function(err, user){
        if (err) return cb(err);
        cb(null, user)
    })
}

// find by token
jobSeekerSchema.statics.findByToken=function(token,cb){
    var user = this

    jwt.verify(token, JWT_KEY, function(err, decode){
        user.findOne({ _id: decode.id, token: token }, function(err, user){
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

//delete token
jobSeekerSchema.methods.deleteToken=function(token, cb){
    var user=this

    user.update({ $unset: { token: 1 }}, function(err, user){
        if (err) return cb(err)
        cb(null, user)
    })
}

module.exports = mongoose.model('jobSeeker', jobSeekerSchema)