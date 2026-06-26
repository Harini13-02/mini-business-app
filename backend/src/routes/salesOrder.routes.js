const express = require('express');

const salesOrderController = require('../controllers/salesOrder.controller');

const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// View all sales orders (ADMIN & SALES_USER)
router.get(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.listSalesOrders
);

// View single sales order (ADMIN & SALES_USER)
router.get(
  '/:id',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.getSalesOrder
);

// Create sales order (ADMIN & SALES_USER)
router.post(
  '/',
  auth,
  requireRole('ADMIN', 'SALES_USER'),
  salesOrderController.createSalesOrder
);

// Confirm sales order (ADMIN only)
router.post(
  '/:id/confirm',
  auth,
  requireRole('ADMIN'),
  salesOrderController.confirmSalesOrder
);

module.exports = router;