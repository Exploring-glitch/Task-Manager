import { getMemberTaskCounts } from "../dao/memberStatsDao.js";
import { findUserById, getAllMembers } from "../dao/userDao.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { forbidden, notFound } from "../utils/errors.js";

// access: admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await getAllMembers();
    const taskCounts = await getMemberTaskCounts(users.map((user) => user._id));

    const usersWithTaskCount = users.map((user) => ({
        ...user.toObject(),
        ...(taskCounts.get(String(user._id)) || {
            pendingTask: 0,
            inProgressTask: 0,
            completedTask: 0,
        }),
    }));

    res.status(200).json(usersWithTaskCount);
});

export const getUserById = asyncHandler(async (req, res) => {
    const isSelf = String(req.user._id) === String(req.params.id);

    if (req.user.role !== "admin" && !isSelf) {
        throw forbidden("You can only view your own profile");
    }

    const user = await findUserById(req.params.id);

    if (!user) {
        throw notFound("User not found");
    }

    res.status(200).json(user);
});
