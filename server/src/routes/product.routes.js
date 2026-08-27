import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import authorize from "../middleware/authorize.middleware.js"
import { createProductController, deleteProductController, getOneProductController, getProductsController, updateProductController } from "../controllers/product.controller.js"

const route = express.Router()

route.post("/create-product",authMiddleware,authorize("supplier","admin"),createProductController)

route.get("/get-products",authMiddleware,getProductsController)

route.get("/get-one-product/:id",authMiddleware,getOneProductController)

route.patch("/update-product/:id",authMiddleware,authorize("supplier","admin"),updateProductController)

route.delete("/delete-product/:id",authMiddleware,authorize("supplier","admin"),deleteProductController)

export default route;