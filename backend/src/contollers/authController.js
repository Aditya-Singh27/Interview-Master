const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist")

/**
 * @name registerUserContoller
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
async function registerUserContoller(req, res) {

    const { username, email, password } = req.body

    const UserExist = await userModel.findOne({
        $or: [{ username }, { email }]              // dono m so koi bhi mil jaye to
    })

    if (UserExist) {
        return res.status(400).json({
            msg: "Account already exist with this email or username"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserContoller
 * @route POST /api/auth/login
 * @description Login a user with email or username and password
 * @access Public
 */
async function loginUserContoller(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(400).json({ message: "No user found with this email." })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid password." })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name blacklistController
 * @route GET /api/auth/logout
 * @description remove token from user cookie and add token in blacklist
 * @access Public
 */
async function blacklistController(req, res) {

    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({ message: "User logged out successfully" })
    
}


/**
 * @name getUserController
 * @route GET /api/auth/get-me
 * @description get user details of logged in user
 * @access Private
 */
async function getUserController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}



module.exports = { 
    registerUserContoller,
    loginUserContoller,
    blacklistController,
    getUserController
}