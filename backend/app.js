import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { allowedOrigins } from "./src/config/config.js";
import { errorHandler, notFoundHandler } from "./src/middleware/errorMiddleware.js";
import { securityHeaders } from "./src/middleware/securityHeaders.js";
import authRouter from "./src/routes/authRoutes.js";
import reportRouter from "./src/routes/reportRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

const app = express();

app.disable("x-powered-by");

// Required for secure cookies / req.ip behind a reverse proxy (Render, Vercel).
app.set("trust proxy", 1);

app.use(securityHeaders);

app.use(
    cors({
        origin(origin, callback) {
            // No origin header: same-origin requests, curl and health checks.
            if (!origin) return callback(null, true);

            const normalized = origin.replace(/\/$/, "");
            return callback(null, allowedOrigins.includes(normalized));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: Math.round(process.uptime()) });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/reports", reportRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
