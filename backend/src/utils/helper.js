import jsonwebtoken from "jsonwebtoken";
import { env } from "../config/env.js";

if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is not configured. Copy backend/.envExample to backend/.env");
}

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

export const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(token, env.jwtSecret);
    return decoded.id;
};
