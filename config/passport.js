const { Strategy } = require('passport-local')
const Manager = require('../models/manager')
const bcrypt = require('bcryptjs')


function isValidPassword(userpassword, password){
    return bcrypt.compareSync(password, userpassword)
}


const initialize = (passport) => {
    passport.use(
        new Strategy({ usernameField: 'email' }, ( email, password, done ) => {
            // Match manager
            if (!email || !password){
                return done(null, false, { message: "Missing credentials!." })
            }
            Manager.findOne({ email: email })
                .then(manager => {
                    if (!manager){
                        return done(null, false, { message: "Email is not registered!." })
                    }
                    if (!isValidPassword(manager.password, password)){
                        return done(null, false, { message: "Incorrect password!." })
                    }
                    const managerInfo = manager
                    console.log(managerInfo)
                    return done(null, managerInfo)
                })
                .catch(err => console.log(err))
        }))
        passport.serializeUser((user, done) => {
            done(null, user.id)
        })

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user)
            })
        })
}


module.exports = initialize