const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { CreateOrder, ReadOrder, UpdateOrder } = require('../controllers/order/index');

route.post('/api/order', CreateOrder);
route.get('/api/order', authToken, authRole(), ReadOrder);
route.put('/api/order/:id', authToken, authRole(), UpdateOrder);

module.exports = route;