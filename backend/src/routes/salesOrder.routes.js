const express = require('express');

const salesOrderController = require('../controllers/salesOrder.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all sales orders
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.listSalesOrders
);

// View single sales order
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.getSalesOrder
);

// Create sales order
router.post(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.createSalesOrder
);

// Confirm sales order
router.post(
  '/:id/confirm',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.confirmSalesOrder
);

module.exports = router;