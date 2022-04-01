const express = require('express');
const route = express.Router();
const { authToken, authRole} = require('../middlewares/auth')
const {
    createMenu,
    getMenu,
    getOneMenu,
    updateMenu,    

} = require('../controllers/tipoMenu/tipoMenu')

route.post( '/api/tipo-menu', authToken, createMenu);
route.get('/api/menu', authToken, getMenu);
route.get('/api/menu/:id', authToken, getOneMenu);
route.put('/api/menu/:id', authToken, updateMenu);
// route.patch(prefix + '/product/:id', authToken, updateProductCant);

module.exports = route;