const express = require('express')
const router = express.Router()

const jobSeekerController = require('../controllers/jobseeker')
const checkAuth = require('../middleware/applicantCheckAuth')


router.route('/signup')
    .get(jobSeekerController.getSignup)
    .post(jobSeekerController.postSignup)

router.route('/login')
    .get(jobSeekerController.getLogin)
    .post(jobSeekerController.postLogin)

router.route('/jobs')
    .get(checkAuth, jobSeekerController.getJobListingPage) 

router.route('/job/:jobId')
    .get(checkAuth, jobSeekerController.getJobDetailsPage)

router.route('/apply/:jobId')
    .get(checkAuth, jobSeekerController.getApplyJob)
    .post(checkAuth, jobSeekerController.postApplyJob)


module.exports = router