import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        purchaseRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseRequest",
            required: true,
            unique: true
        },

        wholeSeller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
            ],
            default: "PROCESSING"
        },

        paymentStatus: {
            type: String,
            enum: ["PAID", "REFUNDED"],
            default: "PAID"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;