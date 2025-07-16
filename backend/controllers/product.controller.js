const Product = require("../models/product.model");
const cloudinary = require('../utils/cloudinary'); 

module.exports = {
    // Create a new product
    createProduct: async (req, res) => {
        try {
            // Handle image uploads
            let imageUrls = [];
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    // multer-storage-cloudinary puts the Cloudinary URL in file.path
                    imageUrls.push(file.path);
                }
            } else if (req.body.images) {
                imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
            }

            const {
                name,
                brand,
                model,
                price,
                mrp,
                discount,
                colorOptions,
                selectedColor,
                rating,
                reviewsCount,
                exchangeOffer,
                emiOption,
                inStock
            } = req.body;

            const product = new Product({
                name,
                brand,
                model,
                price,
                mrp,
                discount,
                colorOptions,
                selectedColor,
                images: imageUrls,
                rating,
                reviewsCount,
                exchangeOffer,
                emiOption,
                inStock
            });

            await product.save();

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });

        } catch (error) {
            console.error("Create product error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const { page = 1, limit = 10, brand, search, inStock, minPrice, maxPrice, minRating, maxRating } = req.query;
            
            let query = {};
            
            // Filter by brand
            if (brand) {
                query.brand = brand;
            }
            
            // Filter by stock status
            if (inStock !== undefined) {
                query.inStock = inStock === 'true';
            }

            // Filter by price range
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = parseFloat(minPrice);
                if (maxPrice) query.price.$lte = parseFloat(maxPrice);
            }

            // Filter by rating range
            if (minRating || maxRating) {
                query.rating = {};
                if (minRating) query.rating.$gte = parseFloat(minRating);
                if (maxRating) query.rating.$lte = parseFloat(maxRating);
            }
            
            // Search across text fields only
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } },
                    { model: { $regex: search, $options: 'i' } },
                    { selectedColor: { $regex: search, $options: 'i' } },
                    { 'colorOptions.name': { $regex: search, $options: 'i' } },
                    { 'colorOptions.hexCode': { $regex: search, $options: 'i' } },
                    { 'emiOption.duration': { $regex: search, $options: 'i' } }
                ];
            }

            const skip = (page - 1) * limit;
            
            const products = await Product.find(query)
                .limit(parseInt(limit))
                .skip(skip)
                .sort({ createdAt: -1 });

            const total = await Product.countDocuments(query);

            res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                data: products,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalProducts: total,
                    productsPerPage: parseInt(limit)
                },
                filters: {
                    search: search || null,
                    brand: brand || null,
                    inStock: inStock || null,
                    minPrice: minPrice || null,
                    maxPrice: maxPrice || null,
                    minRating: minRating || null,
                    maxRating: maxRating || null
                }
            });

        } catch (error) {
            console.error("Get all products error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Get product by ID
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findById(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Product retrieved successfully",
                data: product
            });

        } catch (error) {
            console.error("Get product by ID error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Update product
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const product = await Product.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });

        } catch (error) {
            console.error("Update product error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },

    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });

        } catch (error) {
            console.error("Delete product error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    }
}; 