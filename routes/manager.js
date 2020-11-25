const express = require('express')
const router = express.Router()


const managerController = require('../controllers/manager')


router.route('/')
    .get(managerController.indexGet)

router.route('/signup')
    .get(managerController.getSignup)
    .post(managerController.postSignup)

router.route('/login')
    .get(managerController.getLogin)
    .post(managerController.postLogin)

router.route('/createJobListing')
    .get(managerController.getJobListing)
    .post(managerController.postJobListing)

router.route('/applications/:managerId')
    .get(managerController.getJobApplications)

router.route('/applicant/school/:school')
    .get(managerController.filterBySchool)

router.route('/applicant/skill/:skill')
    .get(managerController.filterBySkill)

router.route('/applicant/skill/:yearsOfExperience')
    .get(managerController.filterByYearsOfExperience)

router.route('/applicant/:applicantId')
    .get(managerController.getCandidates)


module.exports = router