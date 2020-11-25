const express = require('express')
const router = express.Router()


const jobSeekerController = require('../controllers/jobseeker')


router.route('/signup')
    .get(jobSeekerController.getSignup)
    .post(jobSeekerController.postSignup)

router.route('/login')
    .get(jobSeekerController.getLogin)
    .post(jobSeekerController.postLogin)

router.route('/jobs')
    .get(jobSeekerController.getJobListingPage)

router.route('/job/:jobId')
    .get(jobSeekerController.getJobDetailsPage)

router.route('/apply/:jobId')
    .get(jobSeekerController.getApplyJob)
    .post(jobSeekerController.postApplyJob)


module.exports = router