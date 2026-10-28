import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// Single place that loads the .env file. Importing this module (directly or
// through config.js) guarantees process.env is populated before anything reads
// it, no matter which module the bundler evaluates first.
const envPath = fileURLToPath(new URL("../../.env", import.meta.url));

dotenv.config({ path: envPath, quiet: true });

export const env = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    adminInviteToken: process.env.ADMIN_INVITE_TOKEN,
    baseUrl: (process.env.BASE_URL || "").replace(/\/$/, ""),
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
};
