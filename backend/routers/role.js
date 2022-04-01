const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { CreateRole, ReadRole, UpdatetRole, DeleteRole } = require('../controllers/users/roleCtl');
const { Roles } = require('../configurations/Roles');

route.post('/api/role', authToken, authRole(), CreateRole);
route.get('/api/role', authToken, authRole(), ReadRole);
route.put('/api/role/:id', authToken, authRole(), UpdatetRole);
route.delete('/api/role/:id', authToken, authRole(), DeleteRole);

module.exports = route;
