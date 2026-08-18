import express from "express";

const router = express.Router();

router.post("/purchase-requests", authenticate, authrize("admin","wholeSeller"), getAllPurchaseRequests);

router.get("/purchase-requests", authenticate, authrize("admin","supplier"), createPurchaseRequest)

router.get("/purchase-requests/:id", authenticate, authrize("admin","supplier"), getPurchaseRequestById);

router.put("/purchase-requests/:id", authenticate, authrize("admin","supplier"), updatePurchaseRequest);

router.delete("/purchase-requests/:id", authenticate, authrize("admin","supplier"), deletePurchaseRequest); 