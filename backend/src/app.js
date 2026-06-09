const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes');
const customerRoutes = require('./routes/customer.routes');
const salesOrderRoutes = require('./routes/salesOrder.routes');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors());
app.use(express.json());

/* -------------------- HEALTH CHECK -------------------- */

app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

/* -------------------- ROUTES -------------------- */

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales-orders', salesOrderRoutes);

/* -------------------- ERROR HANDLERS -------------------- */

app.use(notFound);
app.use(errorHandler);

module.exports = app;