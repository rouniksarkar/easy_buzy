import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true , "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        enum:["supplier","wholesaler","admin"],
        required:true
    },
    avatar: {
        type: String,
        default: ""
    },
    organisation:{
        type:String,
        default:""
    },
    phone:{
        type:Number,
        min:10,
        max:10,
        default:""
    },
    fullName:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    profileStatus:{
        type:String,
        enum:["activate","inavtiavte","suspended"],
        default:"activate"
    }
},{
    timestamps: true  
})

userSchema.pre("save",async function(){
    if(!this.isModified('password'))
        return ;

    try {
        const salt = 10;
        this.password = await bcrypt.hash(this.password,salt)
    } catch (error) {
        console.log("error on saving password",error);  
    }
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User",userSchema)

export default User;