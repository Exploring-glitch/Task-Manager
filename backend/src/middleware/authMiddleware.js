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

    const userId = verifyToken(token);
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
