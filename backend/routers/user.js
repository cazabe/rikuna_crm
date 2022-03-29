const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { CreateUser } = require('../controllers/users/userCtl');
const { CreateRole } = require('../controllers/users/roleCtl');
const { Roles } = require('../configurations/Roles');

route.post('/api/register/user', authToken, CreateUser);
route.post('/api/role', authToken, authRole(), CreateRole);



module.exports = route;