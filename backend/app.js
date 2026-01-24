import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({path: "./.env"});

import cors from "cors"; 
import path from "path";

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json)