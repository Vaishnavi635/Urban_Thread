const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const products = require('./products.json');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const seedProducts = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Database cleared (Products & Users)');

        // Seed products
        await Product.insertMany(products);
        console.log('All products added');

        // Seed default user
        const defaultUser = await User.create({
            name: 'Anshika Rawat',
            email: 'rawatanshiak007@gmail.com',
            password: 'password123', // This will be hashed by the model pre-save hook
            role: 'admin'
        });
        console.log('Default user created:', defaultUser.email);

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

seedProducts();
