import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { cancelOrderController, getOneOrderController, getOrdersController, statusOrderController } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/",authMiddleware,authorize("admin","supplier","wholesaler"),getOrdersController);

router.get("/:id",authMiddleware,authorize("admin","supplier","wholesaler"),getOneOrderController);

router.patch("/:id/cancel",authMiddleware,authorize("admin","wholesaler"),cancelOrderController);

router.patch("/:id",authMiddleware,authorize("admin","supplier"),statusOrderController);

//router.patch("/:id/deliver",authMiddleware,authorize("admin","supplier"),deliverOrderController);


export default router;