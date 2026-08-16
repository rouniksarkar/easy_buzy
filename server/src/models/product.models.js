import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        requird:true
    },
    description:{
        type:String,
        requird:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        requird:true
    }
},{
    timestamps:true
})

const Product = mongoose.model("Product",productSchema);

export default Product;