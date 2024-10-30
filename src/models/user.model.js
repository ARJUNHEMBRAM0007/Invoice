import mongoose, {Schema} from "mongoose";
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        country: {
            type: String,
            required: true,
            default: "India" 
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"] 
        }
    },
    {
        timestamps: true
    }
) 


export const User = mongoose.model("User", userSchema)