import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import { connectDb } from "./src/config/mongoConfig.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import reportRouter from "./src/routes/reportRoutes.js"
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";



const allowedOrigins = [
  "https://task-manager-git-main-sreeja-deys-projects.vercel.app",
  "https://task-manager-lime-psi-31.vercel.app",
  "https://task-manager-j9gi15pc7-sreeja-deys-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


//app.use(cors({
//    origin: process.env.CLIENT_URL,
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    credentials: true
//}));


app.use(cookieParser());

//middleware
app.use(express.json());


//Routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)
app.use("/api/reports", reportRouter)



//server start
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
