const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth')
const {
    createMenu,
    getMenu,
    getOneMenu,
    updateMenu,

} = require('../controllers/tipoMenu/tipoMenu')

route.post('/api/tipo/menu', authToken, authRole(), createMenu);
route.get('/api/tipo/menu', getMenu);
route.get('/api/tipo/menu/:id', authToken, authRole(), getOneMenu);
route.put('/api/tipo/menu/:id', authToken, authRole(), updateMenu);

module.exports = route;