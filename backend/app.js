import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import cors from "cors"; 
import path from "path";
import { connectDb } from "./src/config/mongoConfig.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";



app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


//middleware
app.use(express.json());


//Routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

/*app.use("/api/reports", reportRoutes)*/


//server start
const PORT = process.env.PORT || 3000;
    app.listen( PORT, () => {
        connectDb();
        console.log(`Server is running on port ${PORT}`);
    }
)