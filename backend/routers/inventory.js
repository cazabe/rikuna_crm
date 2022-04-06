const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth')
const {
    createProducts,
    getProducts,
    getOneProduct,
    updateProduct,
    updateProductCant,
    deleteProduct
} = require('../controllers/inventory/inventory')

route.post('/api/inventory/product', authToken, authRole(), createProducts);
route.get('/api/products', authToken, authRole(), getProducts);
route.get('/api/product/:id', authToken, authRole(), getOneProduct);
route.put('/api/product/:id', authToken, authRole(), updateProduct);
route.patch('/api/product/:id', authToken, authRole(), updateProductCant);
route.delete('/api/product/:id', authToken, authRole(), deleteProduct);

module.exports = route;