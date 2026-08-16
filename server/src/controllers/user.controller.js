import User from "../models/user.models.js"
import jwt from "jsonwebtoken";


async function registerUser(req,res){

    const {username,email,password,role} = req.body;

    if(!username || !email || !password || !role){
        return res.status(400).json({message:"All fields are required"});
    }

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json({message:"User register successfully",user:createdUser});

}

async function loginUser(req,res){

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid password"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token)

    return res.status(200).json({message:"User login successfully"});
} 

async function logoutUser(req,res){

    try {
        res.clearCookie("token");
        return res.status(200).json({message:"User logout successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }

}

export {registerUser,loginUser,logoutUser}