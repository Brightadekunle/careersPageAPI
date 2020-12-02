const express = require('express')
const router = express.Router()

const jobSeekerController = require('../controllers/jobseeker')
const { auth } = require('../middleware/applicantCheckAuth')


// Get and Post routes for job seekers signup
router.route('/signup')
    .get(jobSeekerController.getSignup)
    .post(jobSeekerController.postSignup)

// Get and Post routes for job seekers login
router.route('/login')
    .get(jobSeekerController.getLogin)
    .post(jobSeekerController.postLogin)

// Job seekers logout route
router.route('/logout')
    .get(auth, jobSeekerController.logoutUser)

// Get the job listing page
router.route('/jobs')
    .get(auth, jobSeekerController.getJobListingPage) 

// Get job details page
router.route('/job/:jobId')
    .get(auth, jobSeekerController.getJobDetailsPage)

// Get and Post routes to apply for a particular job
router.route('/apply/:jobId')
    .get(auth, jobSeekerController.getApplyJob)
    .post(auth, jobSeekerController.postApplyJob)


module.exports = router