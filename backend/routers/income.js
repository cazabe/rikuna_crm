const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { getIncome, updateIncome } = require('../controllers/ingress/index');

route.get('/api/income', authToken, authRole(), getIncome);
route.put('/api/income/:id', authToken, authRole(), updateIncome);

module.exports = route;