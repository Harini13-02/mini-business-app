const express = require('express');

const customerController = require('../controllers/customer.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all customers (ADMIN & SALES_USER)
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.listCustomers
);

// View single customer (ADMIN & SALES_USER)
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.getCustomer
);

// Create customer (ADMIN only)
router.post(
  '/',
  auth,
  requireRole('ADMIN'),
  customerController.createCustomer
);

// Update customer (ADMIN only)
router.patch(
  '/:id',
  auth,
  requireRole('ADMIN'),
  customerController.updateCustomer
);

// Delete customer (ADMIN only)
router.delete(
  '/:id',
  auth,
  requireRole('ADMIN'),
  customerController.deleteCustomer
);

module.exports = router;