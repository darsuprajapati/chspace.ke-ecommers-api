const Product = require("../models/product.model");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  // ------------------------------
  // Create a new product
  // ------------------------------
  createProduct: async (req, res) => {
    try {
      // Upload images to Cloudinary
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
        const results = await Promise.all(uploadPromises);
        imageUrls = results.map(r => r.secure_url);
      }


      // Create and save product
      const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        mrp: req.body.mrp,
        discount: req.body.discount,
        rating: req.body.rating,
        reviewsCount: req.body.reviewsCount,
        inStock: req.body.inStock === 'true' || req.body.inStock === true,
        selectedColor: req.body.selectedColor,
        colorOptions: req.body.colorOptions,     // parsed array
        exchangeOffer: req.body.exchangeOffer,    // parsed object
        emiOption:req.body.emiOption,        // parsed object
        images: imageUrls,
      });

      await product.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });

    } catch (error) {
      console.error("Create Product Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // ------------------------------
  // Update an existing product
  // ------------------------------
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      let updateData = { ...req.body };

      // Handle file/image uploads
      let newImages = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          newImages.push(file.path); // Cloudinary URL
        }
      }

      // Parse stringified JSON fields
      const parseField = (field) => {
        try {
          return typeof field === "string" ? JSON.parse(field) : field;
        } catch {
          return null;
        }
      };

      const fieldsToParse = ["colorOptions", "exchangeOffer", "emiOption"];
      for (const field of fieldsToParse) {
        if (updateData[field]) {
          const parsed = parseField(updateData[field]);
          if (parsed === null) {
            return res.status(400).json({
              success: false,
              message: `Invalid JSON in '${field}'`
            });
          }
          updateData[field] = parsed;
        }
      }

      // Fetch existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      // Merge existing and new images
      if (newImages.length > 0) {
        updateData.images = [...existingProduct.images, ...newImages];
      }

      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct
      });

    } catch (error) {
      console.error("Update Product Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  },

  // ------------------------------
  // Get all products
  // ------------------------------
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message
      });
    }
  },

  // ------------------------------
  // Get product by ID
  // ------------------------------
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
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: error.message
      });
    }
  },

  // ------------------------------
  // Delete product
  // ------------------------------
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
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
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message
      });
    }
  }
};
