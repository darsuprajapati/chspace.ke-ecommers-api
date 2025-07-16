const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { authenticateToken } = require("../middlewares/auth");

// Joi validation schemas
const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name cannot exceed 50 characters",
            "any.required": "Name is required"
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),
    mobile: Joi.string()
        .pattern(/^(\+?[\d\s-()]{10,15})$/)
        .required()
        .messages({
            "string.empty": "Mobile number is required",
            "string.pattern.base": "Please enter a valid mobile number",
            "any.required": "Mobile number is required"
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required"
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })
});

// Public routes
router.post("/register", validator.body(registerSchema), userController.register);
router.post("/login", validator.body(loginSchema), userController.login);

// Protected route example
router.get("/profile", authenticateToken, (req, res) => {
    const userResponse = req.user.toObject();
    delete userResponse.password;
    
    res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: userResponse
    });
});

module.exports = router;
