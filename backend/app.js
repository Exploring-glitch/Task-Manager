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
import reportRouter from "./src/routes/reportRoutes.js"

import { fileURLToPath } from "url";


app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


//middleware
app.use(express.json());


//Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//Routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)
app.use("/api/reports", reportRouter)




//server start
const PORT = process.env.PORT || 3000;
    app.listen( PORT, () => {
        connectDb();
        console.log(`Server is running on port ${PORT}`);
    }
)

