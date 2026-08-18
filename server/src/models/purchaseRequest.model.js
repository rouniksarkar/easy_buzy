import mongoose from "mongoose"

const purchaseRequest = new mongoose.Schema({

    wholeSeller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    items: [
        {
            product: ObjectId,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "rejected",
            "cancelled"
        ],
        default: "pending"
    }
},{
    timestamps:true
})

const PurchaseRequest = mongoose.model("PurchaseRequest",purchaseRequest);

export default PurchaseRequest;