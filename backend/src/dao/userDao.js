import User from "../models/userSchema.js"

export const createNewUser = async(name, email, hashedPassword, profileImageUrl, role) =>{
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        profileImageUrl: profileImageUrl,
        role: role
    })
    await newUser.save();
    return newUser;
}

export const findUserById = async(decodedId) =>{
    return await User.findById(decodedId)

}

export const findUserByEmail = async(email) =>{
    return await User.findOne({email});
}
