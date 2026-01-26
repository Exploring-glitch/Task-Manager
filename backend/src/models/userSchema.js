import mongoose from "mongoose";
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            select: false, //this means: donot include the pass while fetching details
        },

        profileImageUrl: {
            type: String,
            default: null
        },

        role: {
            type: String,
            enum: ["admin", "member"],
            default: "member"
        },

    }, 
    { timestamps: true }
)


//we are defining a method named comparePassword that compares pass with the og pass stored in user schema.
//We are attaching this method in the user doc (in mongoose) itself.
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);  
}




const userModel = mongoose.model("user", userSchema);
export default userModel;