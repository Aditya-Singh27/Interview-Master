const { GoogleGenAI, Type, Schema } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const interviewReportResponseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "A list of technical questions asked during the interview, along with the interviewer's intention and how to answer them effectively.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The technical question asked during the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The interviewer's intention behind this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "how to answer the question in a way that satisfies the interviewer's intention, points to cover, correct approach to answer, etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "A list of behavioral questions asked during the interview, along with the interviewer's intention and how to answer them effectively.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The behavioral question asked during the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The interviewer's intention behind this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "how to answer the question in a way that satisfies the interviewer's intention, points to cover, correct approach to answer, etc."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "A list of skill gaps identified during the interview, along with a detailed improvement plan for each skill.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The skill that the candidate is lacking based on the interview feedback"
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description: "The severity of the skill gap (low, medium, high)"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to improve their chances of success in future interviews.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.NUMBER,
                        description: "The day number in the preparation plan"
                    },
                    focus: {
                        type: Type.STRING,
                        description: "The focus area for that day in the preparation plan"
                    },
                    tasks: {
                        type: Type.ARRAY,
                        description: "The specific tasks to be completed on that day to prepare for the interview",
                        items: {type: Type.STRING}
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: {
            type: Type.STRING,
            description: "The title of the job for which the interview is being conducted"
        }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};

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

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportResponseSchema
            }
        })

        const jsonText = response.text || response.candidates[0].content.parts[0].text

        return JSON.parse(jsonText)
    } catch (aiError) {
        console.error("/// GEMINI API CRASH ///")
        console.error(aiError)
        console.error("/////////////////////////")
        throw aiError
    }
}

module.exports = generateInterviewReport