import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            email,
            password: hashedPassword,
            name: name || "",  // Optional name field
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,  // Add this to your .env file
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get current user profile (protected route example)
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};