// utils/jwtHelper.js
import jwt from 'jsonwebtoken';

// Generates a JWT token for the user
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration can be adjusted for security
  });
};

// Verifies a JWT token to ensure it's valid
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
