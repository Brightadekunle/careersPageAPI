const express = require('express')
const router = express.Router()

const jobSeekerController = require('../controllers/jobseeker')
const { auth } = require('../middleware/applicantCheckAuth')


router.route('/signup')
    .get(jobSeekerController.getSignup)
    .post(jobSeekerController.postSignup)

router.route('/login')
    .get(jobSeekerController.getLogin)
    .post(jobSeekerController.postLogin)

router.route('/logout')
    .get(auth, jobSeekerController.logoutUser)

router.route('/jobs')
    .get(auth, jobSeekerController.getJobListingPage) 

router.route('/job/:jobId')
    .get(auth, jobSeekerController.getJobDetailsPage)

router.route('/apply/:jobId')
    .get(auth, jobSeekerController.getApplyJob)
    .post(auth, jobSeekerController.postApplyJob)


module.exports = router