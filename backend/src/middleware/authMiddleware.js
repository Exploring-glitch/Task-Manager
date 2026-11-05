import mongoose from "mongoose";
import { findUserById } from "../dao/userDao.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { forbidden, unauthorized } from "../utils/errors.js";
import { verifyToken } from "../utils/helper.js";

// Authentication middleware for every protected route.
export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        throw unauthorized("Please sign in to continue");
    }

    let userId;

    try {
        userId = verifyToken(token);
    } catch {
        // An invalid or expired token is an authentication failure, not a
        // malformed request.
        throw unauthorized("Your session has expired, please sign in again");
    }

    // A signed token with a missing or malformed id must not reach the database:
    // Mongoose would turn it into a 400 CastError instead of a 401.
    if (!userId || !mongoose.isValidObjectId(userId)) {
        throw unauthorized("Your session has expired, please sign in again");
    }

    const user = await findUserById(userId);

    if (!user) {
        throw unauthorized("Please sign in to continue");
    }

    req.user = user;
    next();
});

// Middleware for admin-only routes.
export const adminOnly = (req, res, next) => {
    if (!req.user) {
        return next(unauthorized());
    }

    if (req.user.role !== "admin") {
        return next(forbidden("Access denied. Only admins are allowed"));
    }

    next();
};
