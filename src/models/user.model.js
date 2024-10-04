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
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
) 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    JsonWebToken.sign(
        {
            _id: this._id,
            Country: this.Country,
            Username: this.Username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    JsonWebToken.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)