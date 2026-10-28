import mongoose from "mongoose";
import User from "../models/userSchema.js";

export const createNewUser = async (name, email, password, profileImageUrl, role) => {
    const newUser = new User({
        name,
        email,
        password,
        profileImageUrl,
        role,
    });

    // The pre-save hook in userSchema hashes `password` before it is stored.
    await newUser.save();
    return newUser;
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Only used during login: the password field is excluded from every other query.
export const findUserByEmailWithPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
};

export const getAllMembers = async () => {
    return await User.find({ role: "member" }).sort({ name: 1 });
};

export const countUsersByIds = async (ids) => {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(String(id)));
    return User.countDocuments({ _id: { $in: objectIds } });
};
