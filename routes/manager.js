const express = require('express')
const router = express.Router()


const managerController = require('../controllers/manager')
const { auth } = require('../middleware/managerCheckAuth')


router.route('/')
    .get(managerController.indexGet)

// Get and Post routes for managers signup
router.route('/signup')
    .get(managerController.getSignup)
    .post(managerController.postSignup)

// Get and Post routes for managers login
router.route('/login')
    .get(managerController.getLogin)
    .post(managerController.postLogin)

// Managers logout route
router.route('/logout')
    .get(auth, managerController.logoutUser)

// Get and Post routes for manager to create a job listing
router.route('/createjob')
    .get(auth, managerController.getJobListing)
    .post(auth, managerController.postJobListing)

// Get job applications for a particular manager
router.route('/applications/:managerId')
    .get(auth, managerController.getJobApplications)

// Filter applicants by schoolname
router.route('/applicant/:schoolname')
    .get(auth, managerController.filterBySchool)

// Filter applicants by skill
router.route('/applicant/:skill')
    .get(auth, managerController.filterBySkill)

// Filter applicants by years of experience
router.route('/applicant/:yearsofexperience')
    .get(auth, managerController.filterByYearsOfExperience)

// Get applicant details
router.route('/applicant/:applicantId')
    .get(auth, managerController.getCandidates)


module.exports = router