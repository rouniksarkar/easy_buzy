import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const route = express.Router()

route.post("/register-user",registerUser)

route.post("/login-user",loginUser)

route.post ("/logout-user",authMiddleware,logoutUser)

export default route;