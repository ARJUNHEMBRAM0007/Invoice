// controllers/authController.js
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { generateToken } from '../utils/jwtHelper.js';

// Registers a new user
export const register = async (req, res) => {
  const { username, email, password, country } = req.body;

  if (!req.body.username) {
    return res.status(400).json({ message: "Username is required" });
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
      username,
      email,
      password: hashedPassword,
      country
    });

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
};

// Logs in a registered user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if provided password matches stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};

// Logs out the user by clearing the client token
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
