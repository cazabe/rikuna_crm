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
} = require('../controllers/inventario/inventarioCtl')

const prefix = "/api"

route.post(prefix + '/inventory/product', authToken, createProducts);
route.get(prefix + '/products', authToken, getProducts);
route.get(prefix + '/product/:id', authToken, getOneProduct);
route.put(prefix + '/product/:id', authToken, updateProduct);
route.patch(prefix + '/product/:id', authToken, updateProductCant);
route.delete(prefix + '/product/:id', authToken, deleteProduct);

module.exports = route;