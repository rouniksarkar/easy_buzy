import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const route = express.Router()

route.post("/register",registerUser)

route.post("/login",loginUser)

route.post ("/logout",authMiddleware,logoutUser)

export default route;