const Manager = require('../models/manager')


let auth = (req, res, next) => {
    let token = req.cookies.auth
    Manager.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({
            error: true
        })
        req.token=token
        req.manager=user
        next()
    })
}



module.exports = { auth }