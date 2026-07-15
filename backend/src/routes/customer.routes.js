const express = require('express');

const customerController = require('../controllers/customer.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all customers
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.listCustomers
);

// View single customer
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.getCustomer
);

// Create customer
router.post(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.createCustomer
);

// Update customer
router.patch(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.updateCustomer
);

// Delete customer
router.delete(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  customerController.deleteCustomer
);

module.exports = router;