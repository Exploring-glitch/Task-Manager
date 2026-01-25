import jsonwebtoken from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const verifyToken = (token) => { 
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return (decoded.id);
}

export const hashPassword = (password) =>{
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
}