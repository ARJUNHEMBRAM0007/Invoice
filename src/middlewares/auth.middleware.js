// middlewares/authMiddleware.js
import { verifyToken } from '../utils/jwtHelper.js';
import { User } from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // Decode and verify token, retrieve user information
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};
