const express = require('express')
const router = express.Router()


const managerController = require('../controllers/manager')
const checkAuth = require('../middleware/managerCheckAuth')


router.route('/')
    .get(managerController.indexGet)

router.route('/signup')
    .get(managerController.getSignup)
    .post(managerController.postSignup)

router.route('/login')
    .get(managerController.getLogin)
    .post(managerController.postLogin)

router.route('/createjob')
    .get(checkAuth, managerController.getJobListing)
    .post(checkAuth, managerController.postJobListing)

router.route('/applications/:managerId')
    .get(checkAuth, managerController.getJobApplications)

router.route('/applicant/:schoolname')
    .get(checkAuth, managerController.filterBySchool)

router.route('/applicant/:skill')
    .get(checkAuth, managerController.filterBySkill)

router.route('/applicant/:yearsofexperience')
    .get(checkAuth, managerController.filterByYearsOfExperience)

router.route('/applicant/:applicantId')
    .get(checkAuth, managerController.getCandidates)


module.exports = router