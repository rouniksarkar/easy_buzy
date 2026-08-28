import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { cancelOrderController, getOneOrderController, getOrdersController } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/",authMiddleware,authorize("admin","supplier","wholeSeller"),getOrdersController);

router.get("/:id",authMiddleware,authorize("admin","supplier","wholeSeller"),getOneOrderController);

router.put("/:id/cancel",authMiddleware,authorize("admin","wholeSeller"),cancelOrderController);

export default router;