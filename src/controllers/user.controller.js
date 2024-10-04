import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "something went wrong while generate refresh and access token")
    }
}


//User Registration
const registerUser = asyncHandler(async (req, res) => {
    
    //get user details
    const{country, username, email, password}= req.body;
    
    //validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
      }

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser){
        throw new ApiError(409, "Email already exists")
    }

    //create object in db
    const user = await User.create({
        country,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong")
    }

    //return 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



});

// User Login
const loginUser =  asyncHandler(async (req, res) => {
   
    const { email, password } = req.body;

    if(!email){
        throw new ApiError(400, "Email is required")
    }

    const user = await User.findOne({email})

    if (!email) {
        throw  new ApiError(400, "Email is not registered")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200,
        {
        user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
        )
    )

})

//User Logout

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out Successfully"))
})




export {registerUser,
    loginUser,
    logoutUser
}