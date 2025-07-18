const express = require("express");
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const productController = require("../controllers/product.controller");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { authenticateToken } = require("../middlewares/auth");

// Remove local disk storage and use CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

// Set file size limit to 2MB (2 * 1024 * 1024 bytes)
const upload = multer({ 
  storage, 
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}); 

// Multer error handler for file size limit
function multerErrorHandler(err, req, res, next) {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Image size should not exceed 2MB.'
    });
  }
  next(err);
}

// Joi validation schemas
const createProductSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "Product name is required",
            "any.required": "Product name is required"
        }),
    brand: Joi.string()
        .optional(),
    model: Joi.string()
        .required()
        .messages({
            "string.empty": "Product model is required",
            "any.required": "Product model is required"
        }),
    price: Joi.number()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "any.required": "Product price is required"
        }),
    mrp: Joi.number()
        .required()
        .messages({
            "number.base": "MRP must be a number",
            "any.required": "Product MRP is required"
        }),
    discount: Joi.number()
        .optional(),
    colorOptions: Joi.array()
        .items(Joi.object({
            name: Joi.string(),
            hexCode: Joi.string().optional()
        }))
        .optional(),
    selectedColor: Joi.string()
        .optional(),
    images: Joi.array()
        .items(Joi.string())
        .optional(),
    rating: Joi.number()
        .min(0)
        .max(5)
        .optional()
        .messages({
            "number.min": "Rating must be at least 0",
            "number.max": "Rating cannot exceed 5"
        }),
    reviewsCount: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.min": "Reviews count cannot be negative"
        }),
    exchangeOffer: Joi.object({
        maxDiscount: Joi.number().optional(),
        isAvailable: Joi.boolean().optional()
    }).optional(),
    emiOption: Joi.object({
        monthly: Joi.number().optional(),
        duration: Joi.string().optional()
    }).optional(),
    inStock: Joi.boolean()
        .optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string()
        .optional(),
    brand: Joi.string()
        .optional(),
    model: Joi.string()
        .optional(),
    price: Joi.number()
        .optional()
        .messages({
            "number.base": "Price must be a number"
        }),
    mrp: Joi.number()
        .optional()
        .messages({
            "number.base": "MRP must be a number"
        }),
    discount: Joi.number()
        .optional(),
    colorOptions: Joi.array()
        .items(Joi.object({
            name: Joi.string(),
            hexCode: Joi.string().optional()
        }))
        .optional(),
    selectedColor: Joi.string()
        .optional(),
    images: Joi.array()
        .items(Joi.string())
        .optional(),
    rating: Joi.number()
        .min(0)
        .max(5)
        .optional()
        .messages({
            "number.min": "Rating must be at least 0",
            "number.max": "Rating cannot exceed 5"
        }),
    reviewsCount: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.min": "Reviews count cannot be negative"
        }),
    exchangeOffer: Joi.object({
        maxDiscount: Joi.number().optional(),
        isAvailable: Joi.boolean().optional()
    }).optional(),
    emiOption: Joi.object({
        monthly: Joi.number().optional(),
        duration: Joi.string().optional()
    }).optional(),
    inStock: Joi.boolean()
        .optional()
});

// Public routes (no authentication required)
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-product-by-id/:id", productController.getProductById);

// Protected routes (authentication required)
router.post('/create-product', authenticateToken, upload.array('images'), multerErrorHandler, productController.createProduct);
router.put("/update-product/:id", authenticateToken, validator.body(updateProductSchema), productController.updateProduct);
router.delete("/delete-product/:id", authenticateToken, productController.deleteProduct);

module.exports = router; 