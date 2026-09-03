import express from "express"
import { getAllProfile, getProfileById, loginUser, logoutUser, registerUser, updateProfileController } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const route = express.Router()

route.post("/register",registerUser)

route.post("/login",loginUser)

route.post ("/logout",authMiddleware,logoutUser)

route.put("/profile/:id",authMiddleware,updateProfileController)

route.get("/profile",authMiddleware,getAllProfile)

route.get("/profile/:id",authMiddleware,getProfileById)

export default route;