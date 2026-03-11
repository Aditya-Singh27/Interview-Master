const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/auth_routes")
const cookieParser = require("cookie-parser")
const interviewRouter = require("./routes/interview")

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  }
))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app