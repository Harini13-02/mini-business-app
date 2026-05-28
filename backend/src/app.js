const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// In-memory product data
const products = [
  {
    id: 1,
    sku: 'P001',
    name: 'Notebook',
    price: 50,
    stockQty: 100
  }
];


// 1. Health Check API
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


// 2. Get All Products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// 3. Get Product By ID
app.get('/api/products/:id', (req, res) => {

  const productId = Number(req.params.id);

  const product = products.find(
    product => product.id === productId
  );

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    });
  }

  res.json(product);
});


// 4. Create Product
app.post('/api/products', (req, res) => {

  const { sku, name, price, stockQty } = req.body;

  // Check missing fields
  if (!sku || !name || price === undefined || stockQty === undefined) {
    return res.status(400).json({
      message: 'sku, name, price, and stockQty are required'
    });
  }

  // Check duplicate SKU
  const existingProduct = products.find(
    product => product.sku === sku
  );

  if (existingProduct) {
    return res.status(400).json({
      message: 'Product SKU already exists'
    });
  }

  // Create new product
  const newProduct = {
    id: products.length + 1,
    sku,
    name,
    price,
    stockQty
  };

  // Add product into array
  products.push(newProduct);

  // Send response
  res.status(201).json(newProduct);
});


module.exports = app;