import jsonwebtoken from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const verifyToken = (token) => { 
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return (decoded.id);
}

export const hashPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = (password) =>{
    
}