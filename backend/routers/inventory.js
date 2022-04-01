const express = require('express');
const route = express.Router();
const { authToken, authRole} = require('../middlewares/auth')
const {
    createProducts,
    getProducts,
    getOneProduct,
    updateProduct,
    updateProductCant,
    deleteProduct
} = require('../controllers/inventory/inventory')

route.post('/api/inventory/product', authToken, createProducts);
route.get('/api/products', authToken, getProducts);
route.get('/api/product/:id', authToken, getOneProduct);
route.put('/api/product/:id', authToken, updateProduct);
route.patch('/api/product/:id', authToken, updateProductCant);
route.delete('/api/product/:id', authToken, deleteProduct);

module.exports = route;