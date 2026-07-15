const express = require('express');

const productController = require('../controllers/product.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all products
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.listProducts
);

// View single product
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.getProduct
);

// Create product
router.post(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.createProduct
);

// Update product
router.patch(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.updateProduct
);

// Delete product
router.delete(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.deleteProduct
);

module.exports = router;