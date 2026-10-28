import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDb = async () => {
    if (!env.mongoUri) {
        throw new Error("MONGODB_URI is not configured. Copy backend/.envExample to backend/.env");
    }

    try {
        await mongoose.connect(env.mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
