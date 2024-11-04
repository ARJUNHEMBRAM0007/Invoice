// routes
import express from 'express';
import {protect} from '../middlewares/auth.middleware.js'
import { register, login, logout, getUserProfile,
    updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register); // Route for user registration
router.post('/login', login);       // Route for user login
router.post('/logout', protect, logout);     // Route for user logout
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);



export default router;
