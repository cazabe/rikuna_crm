const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { CreateMenu, ReadMenu, UpdateMenu } = require('../controllers/menu/index');
const { Roles } = require('../configurations/Roles');

route.post('/api/menu', authToken, authRole(), CreateMenu);
route.get('/api/menu', ReadMenu);
route.put('/api/menu/:id', authToken, authRole(), UpdateMenu);

module.exports = route;