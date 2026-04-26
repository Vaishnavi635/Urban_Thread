const { getAllProducts, getProductById } = require('../services/productService');

// @desc    Get all products (with filters, search, sort, pagination)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const result = await getAllProducts(req.query);

        res.status(200).json({
            success: true,
            count: result.products.length,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            products: result.products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product details
// @route   GET /api/products/:id
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json({ success: true, product });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};
