const JobSeeker = require('../models/jobSeeker')


let auth = (req, res, next) => {
    let token = req.cookies.auth
    JobSeeker.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({
            error: true
        })
        req.token=token
        req.jobSeeker=user
        next()
    })
}



module.exports = { auth }