const express = require('express');
const route = express.Router();
const { authToken, authRole} = require('../middlewares/auth')
const {
    createMenu,
    getMenu,
    getOneMenu,
    updateMenu,    

} = require('../controllers/tipoMenu/tipoMenu')

const prefix = "/api"

route.post(prefix + '/tipo-menu', authToken, createMenu);
route.get(prefix + '/menu', authToken, getMenu);
route.get(prefix + '/menu/:id', authToken, getOneMenu);
route.put(prefix + '/menu/:id', authToken, updateMenu);
// route.patch(prefix + '/product/:id', authToken, updateProductCant);

module.exports = route;