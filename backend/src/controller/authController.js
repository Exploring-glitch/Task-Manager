import { env } from "../config/env.js";
import { getCookieOptions } from "../config/config.js";
import {
    createNewUser,
    findUserByEmail,
    findUserByEmailWithPassword,
    findUserById,
} from "../dao/userDao.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteCloudinaryImage } from "../utils/cloudinaryHelpers.js";
import { AppError, badRequest, notFound, unauthorized } from "../utils/errors.js";
import { signToken } from "../utils/helper.js";
import {
    optionalString,
    requireEmail,
    requirePassword,
    requireString,
} from "../utils/validation.js";

const startSession = (req, res, user) => {
    const token = signToken({ id: user._id });
    res.cookie("token", token, getCookieOptions(req));
    return token;
};

export const userSignup = asyncHandler(async (req, res) => {
    const name = requireString(req.body.name, "Name", { max: 80 });
    const email = requireEmail(req.body.email);
    const password = requirePassword(req.body.password);
    const profileImageUrl = optionalString(req.body.profileImageUrl, "Profile image URL", {
        max: 2048,
    });

    const userExist = await findUserByEmail(email);
    if (userExist) {
        throw new AppError("An account with this email already exists", 409);
    }

    // Only the holder of the invite token can register as an admin.
    const role =
        req.body.adminInviteToken && req.body.adminInviteToken === env.adminInviteToken
            ? "admin"
            : "member";

    const newUser = await createNewUser(name, email, password, profileImageUrl, role);
    startSession(req, res, newUser);

    res.status(201).json({ message: "Sign up success", user: newUser });
});

export const userLogin = asyncHandler(async (req, res) => {
    const email = requireEmail(req.body.email);

    if (typeof req.body.password !== "string" || !req.body.password) {
        throw badRequest("Password is required");
    }

    const user = await findUserByEmailWithPassword(email);
    const isPassValid = user ? await user.comparePassword(req.body.password) : false;

    // Same response for "unknown email" and "wrong password" so the endpoint
    // cannot be used to enumerate registered accounts.
    if (!user || !isPassValid) {
        throw unauthorized("Invalid email or password");
    }

    startSession(req, res, user);

    res.status(200).json({ message: "Login success", user });
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await findUserById(req.user._id);

    if (!user) {
        throw notFound("User not found");
    }

    res.status(200).json({ user });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await findUserById(req.user._id);

    if (!user) {
        throw notFound("User not found");
    }

    const name = optionalString(req.body.name, "Name", { max: 80 });
    const email = req.body.email === undefined ? undefined : requireEmail(req.body.email);
    const profileImageUrl = optionalString(req.body.profileImageUrl, "Profile image URL", {
        max: 2048,
    });
    const password =
        req.body.password === undefined || req.body.password === ""
            ? undefined
            : requirePassword(req.body.password);

    if (email && email !== user.email) {
        const emailTaken = await findUserByEmail(email);
        if (emailTaken) {
            throw new AppError("An account with this email already exists", 409);
        }
        user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = password;

    if (profileImageUrl && profileImageUrl !== user.profileImageUrl) {
        const previousImage = user.profileImageUrl;
        user.profileImageUrl = profileImageUrl;
        // Best effort: do not block the update when cleanup fails.
        void deleteCloudinaryImage(previousImage);
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
});

export const uploadProfileImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image was uploaded" });
    }

    res.status(200).json({ imageUrl: req.file.path });
};

export const userLogout = (req, res) => {
    res.clearCookie("token", { ...getCookieOptions(req), maxAge: undefined });
    res.status(200).json({ message: "Logged out successfully" });
};
