const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/key')

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, JWT_KEY)
        req.userData = decoded
        next()
    } catch (err){
        console.log(err)
        return res.status(401).json({
            message: "Auth failed", 
            error: err
        })
    }
    
}