const express = require('express');

const productController = require('../controllers/product.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all products (ADMIN & SALES_USER)
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.listProducts
);

// View single product (ADMIN & SALES_USER)
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  productController.getProduct
);

// Create product (ADMIN only)
router.post(
  '/',
  auth,
  requireRole('ADMIN'),
  productController.createProduct
);

// Update product (ADMIN only)
router.patch(
  '/:id',
  auth,
  requireRole('ADMIN'),
  productController.updateProduct
);

// Delete product (ADMIN only)
router.delete(
  '/:id',
  auth,
  requireRole('ADMIN'),
  productController.deleteProduct
);

module.exports = router;