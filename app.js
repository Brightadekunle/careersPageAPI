const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('cookie-session')


const app = express()


const dbURI = 'mongodb://127.0.0.1:27017/careerPortal'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('mongoDB connected...'))
    .catch(err => console.log(err))


app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

// Preventing CORS errors CORS-Cross-Origin Resource Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-methods", "GET, POST, PUT, PATCH, DELETE")
        return res.status(200).json({})
    }
    next()
})


const managerRoute = require('./routes/manager')
const jobSeekerRoute = require('./routes/jobseeker')

app.use('/manager/api/', managerRoute)
app.use('/jobseeker/api/', jobSeekerRoute)


app.use((req, res, next) => {
    const error = new Error("Not Found!.")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`listening on PORT ${PORT}...`))