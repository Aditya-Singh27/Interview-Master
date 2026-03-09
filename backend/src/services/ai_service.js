const {GoogleGenAI} = require('@google/genai');
const {z} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description."),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The interviewer's intention behind this question"),
        answer: z.string().describe("how to answer the question in a way that satisfies the interviewer's intention, points to cover, correct approach to answer, etc."),
    })).describe("A list of technical questions asked during the interview, along with the interviewer's intention and how to answer them effectively."),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The interviewer's intention behind this question"),
        answer: z.string().describe("how to answer the question in a way that satisfies the interviewer's intention, points to cover, correct approach to answer, etc."),
    })).describe("A list of behavioral questions asked during the interview, along with the interviewer's intention and how to answer them effectively."),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the interview feedback"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap"),
    })).describe("A list of skill gaps identified during the interview, along with a detailed improvement plan for each skill."),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The focus area for that day in the preparation plan"),
        tasks: z.array(z.string()).describe("The specific tasks to be completed on that day to prepare for the interview"),
    })).describe("A day-wise preparation plan for the candidate to improve their chances of success in future interviews.")

})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Based on the candidate's resume, self-description, and job description, generate a comprehensive interview report. Analyze the candidate's qualifications, experience, and skills against the job requirements. Provide:

                    - A match score from 0-100 indicating fit
                    - Technical questions that might be asked, with intentions and suggested answers
                    - Behavioral questions that might be asked, with intentions and suggested answers
                    - Skill gaps identified, with severity levels
                    - A 7-day preparation plan with daily focus and tasks

                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

                    Ensure the response matches the required JSON structure exactly.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    const jsonText = response.text || response.candidates[0].content.parts[0].text

    return JSON.parse(jsonText)
}

module.exports = generateInterviewReport