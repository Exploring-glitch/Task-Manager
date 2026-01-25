import { findUserById } from "../dao/userDao.js";
import { verifyToken } from "../utils/helper";

//authentication middleware for all
export const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token){ 
        return res.status(401).json({"error" : "Unauthorized"})
    }

    try{
        const decodedId = await verifyToken(token)
        const user = await findUserById(decodedId)
        if(!user){
            return res.status(401).json({"error" : "Unauthorized"})
        }
        req.user = user;
        next();
    } 
    catch(e){
        return res.status(401).json({message:"Unauthorized", "error" : e.message})
    }
}

//middleware for admin-only access

const adminOnly = async(req,res,next) =>{
    try{
        if( req.user && req.user.role === "admin"){
            next();
        }
    }
    catch(e){
        return res.status(403).json({message:"Access denied. Only admins are allowed"})
    }
}
