import express from "express"
import authMiddleware from "../middleware/auth.middleware"
import { deleteNotification, getAllNotifications, getOneNotification, readOneNotification } from "../controllers/notification.controller";

const router = express.Router()

router.get("/notifications", authMiddleware, getAllNotifications);

router.get("/notification/:id",authMiddleware,getOneNotification);

router.patch("/notification/:id",authMiddleware,readOneNotification);

router.delete("/notification/:id",authMiddleware,deleteNotification);

export default router;