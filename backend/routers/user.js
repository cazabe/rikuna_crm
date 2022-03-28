const express = require('express');
const route = express.Router();
const { CreateUser } = require('../controllers/users/usersCtl');
const { CreateRole } = require('../controllers/users/rolesCtl');

route.post('/api/register/user', CreateUser);
route.post('/api/role', CreateRole);



module.exports = route;