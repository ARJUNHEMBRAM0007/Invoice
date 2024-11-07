// controllers
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/jwtHelper.js';

// Registers a new user
export const register = async (req, res) => {
  const { email, password, country } = req.body;
  console.log("Request Body:", req.body);  // Log the data sent from frontend

  if (!email || !password || !country) {
    return res.status(400).json({ message: "All fields are required: email, password, and country" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = await User.create({
      email,
      password: hashedPassword,
      country
    });

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration Error:', error); // More detailed error logging
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
};

// Logs in a registered user
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(422).json({ message: 'Invalid email or password' });  // Clear validation message
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(422).json({ message: 'Invalid email or password' });  // Clear validation message
    }

    // Generate JWT token after successful login
    const token = generateToken(user._id);
    return res.status(200).json({ user, token });
    
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Logs out the user by clearing the client token
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching profile", error: error.message });
  }
};


// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { email, country } = req.body;
    const updatedData = { email, country };
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
      runValidators: true,
    }).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error in updating profile", error: error.message });
  }
};