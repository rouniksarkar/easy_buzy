import User from "../models/user.models.js"
import jwt from "jsonwebtoken";


async function registerUser(req, res) {

    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json({ message: "User register successfully", user: createdUser });

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token)

        return res.status(200).json({ message: "User login successfully" });
    } catch (error) {
        return res.status(500).json({ message: "some thing went wrong on login", error })
    }
}

async function logoutUser(req, res) {

    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

async function updateProfileController(req, res) {

    try {
        const { avatar, organisation, fullName, phone, address } = req.body;

        const { id } = req.params;

        if (id !== req.user.id) {
            return res.status(400).json({ message: "You are not authorized!" })
        }

        const user = await User.findByIdAndUpdate(id, {
            avatar,
            organisation,
            phone,
            address,
            fullName
        }, {
            returnDocument: 'after',
            runValidators: true
        })

        return res.status(200).json({ message: "Profile upated!", user })
    } catch (error) {
        return res.status(500).json({ message: "Failed to upated profile", error: error.message })
    }
}

async function getAllProfile(req, res) {

    try {
        const logedInUser = req.user;

        const query = {};

        if (logedInUser.role === "wholesaler") {
            query = { role: "supplier" }
        }
        else if (logedInUser.role === "supplier") {
            query = { role: "wholesaler" }
        }
        else if (logedInUser.role === "admin") {
            query = {}
        }

        const profiles = await User.find(query).select(" -password")

        return res.status(200).json({ message: "All profile fetched!", profiles })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetching profiles", error:error.message })
    }
}

async function getProfileById(req, res) {

    const logedInUser = req.user;

    const targetUserId = req.params.id;

    const targetProfile = await User.findById(targetUserId);

    if(!targetProfile){
        return res.status(404).json({message:"No user found!"})
    }

    if(targetProfile.id === logedInUser.id){
        return res.status(200).json(targetProfile);
    }

    if(logedInUser.role==="admin"){
        return res.status(200).json(targetProfile);
    }

    if (targetProfile.role === 'admin') {
      return res.status(403).json({ message: "Access denied. Admin profiles are private." });
    }

    if(logedInUser.role === targetProfile.role){
        return res.status(404).json({message:"you restricted from this action!"});
    }

    const safeProfile = {
        name: targetProfile.fullName,
        organisation : targetProfile.organisation,
        email: targetProfile.email,
        phone: targetProfile.phone,
        address: targetProfile.address,
        Role:targetProfile.role
    }

     return res.status(200).json(safeProfile);

}

export { registerUser, loginUser, logoutUser, updateProfileController, getAllProfile, getProfileById }