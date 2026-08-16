import express from "express"
import authMiddleware from "../middleware/auth.middleware"
import authorize from "../middleware/authorize.middleware"
import { createProductController } from "../controllers/product.controller"

const route = express.Router()

route.post("/create-product",authMiddleware,authorize("Supplier"),createProductController)

export default route;