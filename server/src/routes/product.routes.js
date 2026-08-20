import express from "express"
import authMiddleware from "../middleware/auth.middleware"
import authorize from "../middleware/authorize.middleware"
import { createProductController, deleteProductController, getOneProductController, getProductsController, updateProductController } from "../controllers/product.controller"

const route = express.Router()

route.post("/creat-product",authMiddleware,authorize("supplier","admin"),createProductController)

route.get("/get-products",authMiddleware,getProductsController)

route.get("/get-one-product/:id",authMiddleware,getOneProductController)

route.patch("/update-product/:id",authMiddleware,authorize("supplier","admin"),updateProductController)

route.delete("/delete-product/:id",authMiddleware,authorize("supplier","admin"),deleteProductController)

export default route;