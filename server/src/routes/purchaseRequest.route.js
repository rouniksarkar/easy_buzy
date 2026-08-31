import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { acceptPurchaseRequest, cancelPurchaseRequest, createPurchaseRequest, deletePurchaseRequest, getAllPurchaseRequests, getPurchaseRequestById, payPurchaseRequest, rejectPurchaseRequest } from "../controllers/purchaseRequest.controller.js";
const router = express.Router();

router.post("/purchase-requests", authMiddleware, authorize("wholesaler"),createPurchaseRequest);

router.get("/purchase-requests", authMiddleware, authorize("admin","supplier","wholesaler"),getAllPurchaseRequests )

router.get("/purchase-requests/:id", authMiddleware, authorize("admin","supplier","wholesaler"), getPurchaseRequestById);

router.put("/purchase-requests/:id/accept", authMiddleware, authorize("admin","supplier"), acceptPurchaseRequest);

router.put("/purchase-requests/:id/reject", authMiddleware, authorize("admin","supplier"), rejectPurchaseRequest);

router.put("/purchase-requests/:id/cancel", authMiddleware, authorize("admin","wholesaler"), cancelPurchaseRequest);

router.post("/purchase-requests/:id/pay", authMiddleware, authorize("wholesaler"), payPurchaseRequest);

router.delete("/purchase-requests/:id", authMiddleware, authorize("admin","supplier","wholesaler"), deletePurchaseRequest); 

export default router;