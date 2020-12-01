const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Manager = require('../models/manager')
const Job = require('../models/job')
const Category = require('../models/category')
const Type = require('../models/type')
const Applicant = require('../models/applicant')
const { JWT_KEY } = require('../config/key')

const indexGet = (req, res, next) => {
    Manager.find()
        .then(managers => {
            // console.log(managers)
            res.status(200).json({
                message: "Welcome to the index page!.",
                manager: managers
            })
        })
        .catch(err => {
            console.log(err)
            res.status({error: err})
        })
}

const getJobListing = (req, res, next) => {
    // The Job listing create page should be rendered here
    res.status(200).json({
        message: "Welcome to Job Listing Page!."
    })
}

const postJobListing = async (req, res, next) => {
    let { title, salaryRange, description, location, otherInfo, dueDate, manager, category, type } = req.body

    if (!title || !salaryRange || !description || !location || !otherInfo || !dueDate || !manager || !category || !type){
        res.status(404).json({
            message: "Missing credentials!."
        })
    } else {

        const checkType = await Type.findOne({ name: type })
        const checkCategory = await Category.findOne({ name: category })
        if (!checkType & !checkCategory){
            const newType = new Type({ name: type })
            newType.save()
                .then(savedType => {
                    const newCategory = new Category({ name: category })
                    newCategory.save()
                        .then(savedCategory => {
                            const newJob = new Job({
                                title: title,
                                salaryRange: salaryRange,
                                description: description,
                                location: location,
                                otherInfo: otherInfo,
                                dueDate: dueDate,
                                manager: manager,
                                category: savedCategory._id,
                                type: savedType._id
                            })
                            Job.findOne({ title: title, salaryRange: salaryRange, description: description, location: location, otherInfo: otherInfo, manager: manager, category: savedCategory, type: savedType })
                                .then(job => {
                                    if (!job){
                                        newJob.save()
                                            .then(savedJob => {
                                                res.status(201).json({ job: savedJob })
                                            })
                                    } else {
                                        res.status(500).json({ message: "You have created this job before" })
                                    }
                                })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        } else if (checkType && !checkCategory) {
            const newCategory = new Category({ name: category })
            newCategory.save()
                .then(savedCategory => {
                    const newJob = new Job({
                        title: title,
                        salaryRange: salaryRange,
                        description: description,
                        location: location,
                        otherInfo: otherInfo,
                        dueDate: dueDate,
                        manager: manager,
                        category: savedCategory._id,
                        type: checkType._id
                    })
                    Job.findOne({ title: title, salaryRange: salaryRange, description: description, location: location, otherInfo: otherInfo, manager: manager, category: savedCategory, type: checkType })
                        .then(job => {
                            if (!job){
                                newJob.save()
                                    .then(savedJob => {
                                        res.status(201).json({ job: savedJob })
                                    })
                            } else {
                                res.status(500).json({ message: "You have created this job before" })
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        } else if (!checkType && checkCategory){
            const newType = new Type({ name: type })
                newType.save()
                    .then(savedType => {
                        const newJob = new Job({
                            title: title,
                            salaryRange: salaryRange,
                            description: description,
                            location: location,
                            otherInfo: otherInfo,
                            dueDate: dueDate,
                            manager: manager,
                            category: checkCategory._id,
                            type: savedType._id
                        })
                        Job.findOne({ title: title, salaryRange: salaryRange, description: description, location: location, otherInfo: otherInfo, manager: manager, category: checkCategory, type: savedType })
                            .then(job => {
                                if (!job){
                                    newJob.save()
                                        .then(savedJob => {
                                            res.status(201).json({ job: savedJob })
                                        })
                                } else {
                                    res.status(500).json({ message: "You have created this job before" })
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
        } else {
            const newJob = new Job({
                title: title,
                salaryRange: salaryRange,
                description: description,
                location: location,
                otherInfo: otherInfo,
                dueDate: dueDate,
                manager: manager,
                category: checkCategory._id,
                type: checkType._id
            })
            Job.findOne({ title: title, salaryRange: salaryRange, description: description, location: location, otherInfo: otherInfo, manager: manager, category: checkCategory, type: checkType })
                .then(job => {
                    if (!job){
                        newJob.save()
                            .then(savedJob => {
                                res.status(201).json({ job: savedJob })
                            })
                    } else {
                        res.status(500).json({ message: "You have created this job before" })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        }
        
    }

}

const getSignup = (req, res, next) => {
    // The signUp page for the manager should be rendered here
    res.status(200).json({
        message: "Welcome to the manager's signup page!."
    })
}

const postSignup = (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber, businessName, department } = req.body

    Manager.findOne({ firstName: firstName })
        .then(recruiter => {
            if (recruiter){
                res.status(409).json({
                    message: "Mail exist!."
                })
            } else{
                const hash = bcrypt.hashSync(password, bcrypt.genSalt(10, (err) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    }
                }))
                const manager = new Manager({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    phoneNumber: phoneNumber,
                    businessName: businessName,
                    department: department
                })
                manager.save()
                    .then(savedManager => {
                        // redirect to managers login page
                        console.log(savedManager)
                        res.status(201).json({
                            message: "Manager created!.",
                            manager: savedManager
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
    // render the managers login page
    res.status(200).json({
        message: "Welcome to the manager's login page!."
    })
}


const postLogin = (req, res, next) => {
    let token = req.cookies.auth
    Manager.findByToken(token, (err, user) => {
        if (err) {
            res.status(400).json({ 
                error: err
             })
        }
        if (user) {
            res.status(400).json({
                error: true,
                message: "You are already logged in!."
            })
        } else {
            Manager.findOne({ email: req.body.email })
                .then(manager => {
                    if(!req.body.department || !req.body.email || !req.body.password){
                        res.status(404).json({
                            message: "Missing credentials"
                        })
                    }
                    if (manager.department != req.body.department){
                        res.status(404).json({
                            message: "Incorrect department!."
                        })
                    }
                    if (!manager){
                        res.status(404).json({
                            message: "Auth failed!."
                        })
                    }
                    if (!bcrypt.compareSync(req.body.password, manager.password)){
                        res.status(401).json({
                            message: "Password is incorrect!."
                        })
                    } else{
                        // redirect to probably the home or profile page of the manager
                        const token = jwt.sign({ email: manager.email, id: manager._id }, JWT_KEY, { expiresIn: "1h" })
                        manager.generateToken(token, (err, user) => {
                            if (err) return res.status(400).send(err)
                            res.cookie('auth', token).json({
                                isAuth: true,
                                token: token
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
    })
}

const logoutUser = (req, res, next) => {
    req.manager.deleteToken(req.token, (err, user) => {
        if (err){
            res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            message: "Logout successful"
        })
    })
}

// To view all job applications for my department, query the applicant db and check for those that have my id registered under them
const getJobApplications = (req, res, next) => {
    const managerId = req.params.managerId
    Applicant.find({ manager: managerId })
        .then(applicants => {
            if (applicants.length == 0){
                res.status(404).json({
                    message: "You do not have any applicants"
                })
            } else {
                res.status(200).json({ 
                    message: "These are your applicants",
                    applicants: applicants
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

// To filter applicants by years of experience
const filterByYearsOfExperience = (req, res, next) => {
    Applicant.find({ yearsOfExperience: req.params.yearsOfExperience })
        .then(applicants => {
            if (applicants.length == 0){
                res.status(500).json({ 
                    message: "There are no applicants with this years of experience"
                })
            } else {
                res.status(200).json({
                    applicants: applicants
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

// To filter applicants by school
const filterBySchool = (req, res, next) => {
    Applicant.find({ school: req.params.school })
        .then(applicants => {
            if (applicants.length == 0){
                res.status(500).json({ 
                    message: "There are no applicants from this school"
                })
            } else {
                res.status(200).json({
                    applicants: applicants
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

// To filter applicants by skill
const filterBySkill = (req, res, next) => {
    Applicant.find({ skill: req.params.skill })
        .then(applicants => {
            if (applicants.length == 0){
                res.status(500).json({ 
                    message: "There are no applicants with this skill"
                })
            } else {
                res.status(200).json({
                    applicants: applicants
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

// Review job applications by selecting candidates
const getCandidates = (req, res, next) => {
    Applicant.findById({ _id: req.params.applicantId })
        .then(applicant => {
            if (!applicant){
                res.status(500).json({ 
                    message: "Applicant not found!."
                })
            } else {
                res.status(200).json({
                    applicant: applicant
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
    logoutUser,
    indexGet,
    getJobListing,
    postJobListing,
    getJobApplications,
    filterBySchool,
    filterBySkill,
    filterByYearsOfExperience,
    getCandidates,
}