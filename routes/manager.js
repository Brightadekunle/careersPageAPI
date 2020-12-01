const express = require('express')
const router = express.Router()


const managerController = require('../controllers/manager')
const { auth } = require('../middleware/managerCheckAuth')


router.route('/')
    .get(managerController.indexGet)

router.route('/signup')
    .get(managerController.getSignup)
    .post(managerController.postSignup)

router.route('/login')
    .get(managerController.getLogin)
    .post(managerController.postLogin)

router.route('/logout')
    .get(auth, managerController.logoutUser)

router.route('/createjob')
    .get(auth, managerController.getJobListing)
    .post(auth, managerController.postJobListing)

router.route('/applications/:managerId')
    .get(auth, managerController.getJobApplications)

router.route('/applicant/:schoolname')
    .get(auth, managerController.filterBySchool)

router.route('/applicant/:skill')
    .get(auth, managerController.filterBySkill)

router.route('/applicant/:yearsofexperience')
    .get(auth, managerController.filterByYearsOfExperience)

router.route('/applicant/:applicantId')
    .get(auth, managerController.getCandidates)


module.exports = router