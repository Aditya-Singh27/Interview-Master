const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai_service")
const interviewReportModel = require("../models/interviewReport")

async function generateInterviewReportController(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            })
        }

        const pdfData = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const resumeContent = pdfData.text

        const { selfDescription, jobDescription } = req.body

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
        console.error("Interview report error:", error)

        res.status(500).json({
            message: "Failed to generate interview report"
        })
    }
}

module.exports = generateInterviewReportController