/**
 * Minimal in-memory rate limiter.
 *
 * Good enough for a single instance deployment (Render). If the API is ever
 * scaled horizontally this should move to Redis or a shared store.
 */
export const createRateLimiter = ({
    windowMs = 15 * 60 * 1000,
    max = 100,
    message = "Too many requests. Please try again later.",
} = {}) => {
    const hits = new Map();

    // Drop expired buckets so the Map cannot grow forever.
    const cleanup = setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of hits) {
            if (entry.resetAt <= now) hits.delete(key);
        }
    }, windowMs);

    if (typeof cleanup.unref === "function") cleanup.unref();

    return (req, res, next) => {
        const key = req.ip || req.socket.remoteAddress || "unknown";
        const now = Date.now();
        const entry = hits.get(key);

        if (!entry || entry.resetAt <= now) {
            hits.set(key, { count: 1, resetAt: now + windowMs });
            return next();
        }

        entry.count += 1;

        if (entry.count > max) {
            res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
            return res.status(429).json({ message });
        }

        next();
    };
};

export const authRateLimiter = createRateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 20,
    message: "Too many authentication attempts. Please try again in a few minutes.",
});

export const uploadRateLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 30,
    message: "Too many uploads. Please try again later.",
});
