const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes');
const customerRoutes = require('./routes/customer.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check API
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Product Routes
app.use('/api/products', productRoutes);

// Customer Routes
app.use('/api/customers', customerRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Internal server error'
  });
});

module.exports = app;