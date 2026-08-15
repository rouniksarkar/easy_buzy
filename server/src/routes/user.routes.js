import express from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"

const route = express.Router()

route.post("/register-user",registerUser)

route.post("/login-user",loginUser)

// route.get("/get-user",getUser)

// route.get("/get-one-user/:id",getOneUser)

export default route;