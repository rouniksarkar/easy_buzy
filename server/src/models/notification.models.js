import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "PURCHASE_REQUEST",
                "REQUEST_ACCEPTED",
                "REQUEST_REJECTED",
                "PAYMENT_SUCCESS",
                "ORDER_CREATED",
                "ORDER_PROCESSING",
                "ORDER_SHIPPED",
                "ORDER_DELIVERED",
                "ORDER_CANCELLED"
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        relatedId: {
            type: mongoose.Schema.Types.ObjectId
        },

        relatedType: {
            type: String,
            enum: [
                "PurchaseRequest",
                "Order",
                "Payment"
            ]
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;