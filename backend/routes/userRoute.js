import express from 'express';
import { registerUser, loginUser, logoutUser, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route (requires authentication)
router.get("/profile", authenticate, getProfile);

export default router;