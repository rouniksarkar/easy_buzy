import express from "express"
import { activateProfile, getAllProfile, getProfileById, loginUser, logoutUser, registerUser, suspendProfile, updateProfileController } from "../controllers/user.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import authorize from "../middleware/authorize.middleware.js"

const route = express.Router()

route.post("/register",registerUser)

route.post("/login",loginUser)

route.post ("/logout",authMiddleware,logoutUser)

route.put("/profile/:id",authMiddleware,updateProfileController)

route.get("/profile",authMiddleware,getAllProfile)

route.get("/profile/:id",authMiddleware,getProfileById)

route.put("/:id/suspend",authMiddleware,authorize("admin"),suspendProfile)

route.put("/:id/activate",authMiddleware,authorize("admin"),activateProfile)

export default route;