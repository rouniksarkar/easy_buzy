import express from "express"
import authMiddleware from "../middleware/auth.middleware"
import authorize from "../middleware/authorize.middleware"
import { createProductController, deleteProductController, getOneProductController, getProductsController, updateProductController } from "../controllers/product.controller"

const route = express.Router()

route.post("/product",authMiddleware,authorize("supplier","admin"),createProductController)

route.get("/products",authMiddleware,getProductsController)

route.get("/product/:id",authMiddleware,getOneProductController)

route.patch("/product/:id",authMiddleware,authorize("supplier","admin"),updateProductController)

route.delete("/product/:id",authMiddleware,authorize("supplier","admin"),deleteProductController)

export default route;