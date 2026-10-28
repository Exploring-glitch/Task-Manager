import mongoose from "mongoose";
import app from "./app.js";
import { env } from "./src/config/env.js";
import { connectDb } from "./src/config/mongoConfig.js";

const startServer = async () => {
    await connectDb();

    const server = app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port}`);
    });

    const shutdown = (signal) => {
        console.log(`${signal} received, closing server`);

        server.close(async () => {
            await mongoose.disconnect();
            process.exit(0);
        });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer();
