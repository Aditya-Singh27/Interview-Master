const express = require("express")
const authUser = require("../middlewares/auth")
const upload = require("../middlewares/file_upload")
const generateInterviewReportController = require("../contollers/interviewController")



const interviewRouter = express.Router()


/**
 * @route POST /api/interview/
 * @description generate interview report on the basis of seldescription, resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

module.exports = interviewRouter