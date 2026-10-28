import { env } from "./env.js";

export const isProduction = env.nodeEnv === "production";

// Keep the cookie lifetime in sync with the JWT lifetime. A cookie that expires
// before its token makes users look logged out for no reason.
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: SESSION_DURATION_MS,
    path: "/",
};

export const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

// Local development is allowed out of the box so the frontend keeps working
// without extra configuration.
if (!isProduction && allowedOrigins.length === 0) {
    allowedOrigins.push("http://localhost:5173");
}
