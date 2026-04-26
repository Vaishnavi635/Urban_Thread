const Product = require('../models/Product');

/**
 * Get all products with filtering, search, sorting, and pagination
 */
const getAllProducts = async (queryParams) => {
    const { category, search, sort, page = 1, limit = 12 } = queryParams;
    
    // Build filter object
    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    // Build sort object
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { ratings: -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));

    return {
        products,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total
    };
};

/**
 * Get a single product by its ID
 */
const getProductById = async (id) => {
    const product = await Product.findById(id);
    
    if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    return product;
};

module.exports = { getAllProducts, getProductById };
