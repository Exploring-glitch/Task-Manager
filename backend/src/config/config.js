import { env } from "./env.js";

export const isProduction = env.nodeEnv === "production";

// Default session lifetime: 7 days. Keep this in sync with JWT_EXPIRES_IN,
// otherwise the cookie can expire before (or outlive) its token.
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/**
 * Cookie flags are derived per request so the API also works when NODE_ENV is
 * not set to "production" on a platform that still terminates HTTPS (Render,
 * Vercel, ...).
 */
export const getCookieOptions = (req) => {
    // Proxies may append to X-Forwarded-Proto (for example "https, http"), so
    // only the first value describes the connection from the browser.
    const forwardedProto = String(req?.headers?.["x-forwarded-proto"] || "")
        .split(",")[0]
        .trim()
        .toLowerCase();
    const isSecure = isProduction || req?.secure === true || forwardedProto === "https";

    return {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        maxAge: SESSION_DURATION_MS,
        path: "/",
    };
};

export const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

// Local development is allowed out of the box so the frontend keeps working
// without extra configuration.
if (!isProduction) {
    for (const localOrigin of ["http://localhost:5173", "http://127.0.0.1:5173"]) {
        if (!allowedOrigins.includes(localOrigin)) {
            allowedOrigins.push(localOrigin);
        }
    }
}
