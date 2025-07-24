import express from 'express';
const router = express.Router();

import { getProducts, getProductsById } from '../controllers/productController.js';
router.route('/').get(getProducts);
// @desc Fetch all products
// @route GET /api/products
// @access Public
   
router.route('/:id').get(getProductsById);
    export default router;