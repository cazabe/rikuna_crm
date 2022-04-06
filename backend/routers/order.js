const express = require('express');
const route = express.Router();
const { CreateOrder, ReadOrder, UpdateOrder } = require('../controllers/order/index');

route.post('/api/order', CreateOrder);
route.get('/api/order', ReadOrder);
route.put('/api/order/:id', UpdateOrder);

module.exports = route;