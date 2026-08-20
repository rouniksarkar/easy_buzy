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
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    product:{
        type:String,
        required:[true,"Name of the product"],
    },
    Quantity:{
        type:Number,
        required:[true,"Quantity of the product"],
    },

    totalAmount: {
        type:Number,
        required:[true,"Quantity of the product"],
    },

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