const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// JWT Secret Key (in production, use environment variable)

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, mobile, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            // Create new user
            const user = new User({
                name,
                email,
                mobile,
                password
            });

            await user.save();

            // Return user data without password
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: userResponse
            });

        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Check password
            if (user.password !== password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            // Generate JWT token
            const token = generateToken(user._id);

            // Return user data without password
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: userResponse,
                token: token
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    }
};
