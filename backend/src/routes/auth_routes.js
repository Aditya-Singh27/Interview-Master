const express = require("express")
const {registerUserContoller, loginUserContoller, blacklistController, getUserController} = require("../contollers/authController")
const authUser = require("../middlewares/auth")


const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register" , registerUserContoller)

/**
 * @route POST /api/auth/login
 * @description Login a user with email or username and password
 * @access Public
 */
authRouter.post("/login", loginUserContoller)

/**
 * @route GET /api/auth/logout
 * @description remove token from user cookie and add token in blacklist
 * @access Public
 */
authRouter.get("/logout", blacklistController)

/**
 * @route GET /api/auth/get-me
 * @description get user details of logged in user
 * @access Private
 */
authRouter.get("/get-me", authUser, getUserController)


module.exports = authRouter