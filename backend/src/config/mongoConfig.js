import mongoose from "mongoose";

export const connectDb = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb");
    } 
    catch(e){
        console.log("Error connecting to mongodb. Error:", e.message);
        process.exit(1)
    }
}