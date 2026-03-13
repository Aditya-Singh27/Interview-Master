const express = require("express")
const authUser = require("../middlewares/auth")
const upload = require("../middlewares/file_upload")
const {generateInterviewReportController, 
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController} = require("../contollers/interviewController")


const interviewRouter = express.Router()


/**
 * @route POST /api/interview/
 * @description generate interview report on the basis of seldescription, resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interview id
 * @access private
 */

interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all the interview reports of logged in users
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate resume pdf on the basis of resume, self description and job description
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)

module.exports = interviewRouter