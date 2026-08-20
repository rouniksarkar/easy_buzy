import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
const router = express.Router();

router.post("/purchase-requests", authMiddleware, authorize("wholeSeller"),createPurchaseRequest);

router.get("/purchase-requests", authMiddleware, authorize("admin","supplier","wholeSeller"),getAllPurchaseRequests )

router.get("/purchase-requests/:id", authMiddleware, authorize("admin","supplier","wholeSeller"), getPurchaseRequestById);

router.put("/purchase-requests/:id/accept", authMiddleware, authorize("admin","supplier"), acceptPurchaseRequest);

router.put("/purchase-requests/:id/reject", authMiddleware, authorize("admin","supplier"), rejectPurchaseRequest);

router.put("/purchase-requests/:id/cancel", authMiddleware, authorize("admin","wholeSeller"), cancelPurchaseRequest);

router.delete("/purchase-requests/:id", authMiddleware, authorize("admin","supplier","wholeSeller"), deletePurchaseRequest); 

export default router;