// routes/authRoutes.js
import express from 'express';
import { register, login, logout } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register); // Route for user registration
router.post('/login', login);       // Route for user login
router.post('/logout', logout);     // Route for user logout

export default router;
