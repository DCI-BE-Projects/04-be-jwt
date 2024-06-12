import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = req.body;

    try {
        const product = await Product.create(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json( { error: 'Something went wrong!' });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found!' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json( { error: 'Something went wrong!' });
    }
});

// Delete many products
router.delete('/', async (req, res) => {
    try {
        const { filter } = req.body;
        const result = await Product.deleteMany(filter);
        res.status(200).json({ message: 'Products deleted successfully', deletedCound: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
})

export default router;