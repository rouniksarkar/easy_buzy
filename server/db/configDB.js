import mongoose from "mongoose"

export default async function connectDb(){

    if(mongoose.connection.readyState === 1){
        console.log("Allredy connected!");   
        return  
    }

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined in the environment variables")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("mongoDb connection error!",error)
    }
}