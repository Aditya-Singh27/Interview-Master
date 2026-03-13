const pdfParse = require("pdf-parse")
const {generateInterviewReport, generateResumePdf} = require("../services/ai_service")
const interviewReportModel = require("../models/interviewReport")


/**
 * @description generate interview report on the basis of selfdescription, resume and job description
 */
async function generateInterviewReportController(req, res) {

    try {

        const { selfDescription, jobDescription } = req.body

        if (!req.file && !selfDescription) {
            return res.status(400).json({
                message: "Either a Resume file or a Self Description is required"
            })
        }

        let resumeContent = ""
        if (req.file) {
            const pdfData = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
            resumeContent = pdfData.text
        }

        const interviewReportAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.error("Interview report error:", error, error?.stack)

        res.status(500).json({
            message: "Failed to generate interview report",
            error: error?.message
        })
    }
}


/**
 * @description get interview report by interview id
 */ 
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        })
    } catch (error) {
        console.error("Interview report error:", error)

        res.status(500).json({
            message: "Failed to fetch interview report"
        })
    }
}   

/**
 * @description get all the interview reports of logged in users
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({user: req.user.id})
                                    .sort({createdAt: -1})
                                    .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports
        })
    } catch (error) {
        console.error("Interview report error:", error)

        res.status(500).json({
            message: "Failed to fetch interview reports"
        })
    }
}

/**
 * @description Generate resume pdf on the basis of resume, self description and job description
 */
async function generateResumePdfController(req, res) {
    const {interviewReportId} = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const {resume, selfDescription, jobDescription} = interviewReport

    const pdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })
    res.send(pdfBuffer)

}

module.exports = {
                    generateInterviewReportController, 
                    getInterviewReportByIdController, 
                    getAllInterviewReportsController, 
                    generateResumePdfController
                }