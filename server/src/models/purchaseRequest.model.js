import mongoose from "mongoose";

const purchaseRequestSchema = new mongoose.Schema(
    {
        wholeseller: {
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
                    required: true,
                    min: 1
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                },

                total: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: [true, "Total amount is required"],
            min: [0, "Total amount cannot be negative"]
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
        },
        paymentStatus:{
            type:String,
            enum:["paid","pending","failed"],
            default:"pending"
        }
    },
    {
        timestamps: true
    }
);

purchaseRequestSchema.pre("validate", function() {
    if(this.items && this.items.length > 0){
        this.totalAmount = this.items.reduce((sum,item)=>sum+(item.price * item.quantity) , 0)
    }
    else{
        this.totalAmount = 0;
    }
})

const PurchaseRequest = mongoose.model(
    "PurchaseRequest",
    purchaseRequestSchema
);

export default PurchaseRequest;