const JobSeeker = require('../models/jobSeeker')
const bcrypt = require('bcryptjs')
const Applicant = require('../models/applicant')
const Job = require('../models/job')

const getSignup = (req, res, next) => {
    // render page for job seekers to signup
    res.status(200).json({
        message: "Welcome to the job seeker signup page!."
    })
}

const postSignup = (req, res, next) => {
    let { firstName, lastName, email, password } = req.body

    JobSeeker.findOne({ email: email })
        .then(jobSeeker => {
            if (jobSeeker){
                res.status(409).json({
                    message: "Mail exist!."
                })
            } else {
                const hash = bcrypt.hashSync(password, bcrypt.genSalt(10, (err) => {
                    if (err){
                        res.status(500).json({
                            error: err
                        })
                    }
                }))
                const newJobSeeker = new JobSeeker({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash
                })
                newJobSeeker.save()
                    .then(savedJobSeeker => {
                        // console.log(savedJobSeeker)
                        res.status(201).json({
                            message: "Job seeker created!.",
                            jobSeeker: savedJobSeeker
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

const getLogin = (req, res, next) => {
    // render page for job seekers to login
    res.status(200).json({
        message: "Welcome to the job seeker login page!."
    })
}

const postLogin = (req, res, next) => {
    JobSeeker.findOne({ email: req.body.email })
    .then(jobSeeker => {
        if(!req.body.email || !req.body.password){
            res.status(404).json({
                message: "Missing credentials"
            })
        }
        if (!jobSeeker){
            res.status(404).json({
                message: "Auth failed!."
            })
        }
        if (!bcrypt.compareSync(req.body.password, jobSeeker.password)){
            res.status(401).json({
                message: "Auth failed!."
            })
        } else{
            res.status(200).json({
                message: "Auth successful!."
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }) 
}

const getJobListingPage = (req, res, next) => {

    // Displays the job listing page
    Job.find()
        .then(jobs => {
            res.status(200).json({ 
                message: jobs
            })
        })
}

const getJobDetailsPage = (req, res, next) => {
    
    // Display the details page for a job
    Job.findById({ _id: req.params.jobId })
        .then(job => {
            res.status(200).json({
                message: "Welcome to Details page!.",
                job: job 
            })
        })
}

const getApplyJob = (req, res, next) => {
    // render page for jobseekers to apply
    const jobId = req.params.jobId
    res.status(200).json({
        message: "Welcome to Apply job page!.",
        jobId: jobId 
    })
}


const postApplyJob = (req, res, next) => {
    const { firstName, lastName, email, location, school, yearOfExperience, placeOfWork, locationOfWorkplace, skill, resume, type, category } = req.body
    const jobId = req.params.jobId
    Applicant.findOne({ email: email })
        .then(applicant => {
            if (applicant){
                res.status(500).json({
                    message: "Email already exist!."
                })
            } else{
                // How about query the Job database to get the job id and know which job the applicant is applying for
                Job.findById({ _id: jobId })
                    .then(job => {
                        const newApplicant = new Applicant({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            location: location,
                            school: school,
                            yearsOfExperience: yearOfExperience,
                            placeOfWork: placeOfWork,
                            locationOfWorkplace: locationOfWorkplace,
                            skill: skill,
                            resume: resume,
                            type: type,
                            category: category,
                            job: job._id,
                            manager: job.manager
                        })
                        newApplicant.save()
                            .then(savedApplicant => {
                                // console.log(savedApplicant)
                                res.status(201).json({
                                    message: "Application submitted successfully!.",
                                    applicant: savedApplicant
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}



module.exports = {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    getApplyJob,
    postApplyJob,
    getJobListingPage,
    getJobDetailsPage,
}