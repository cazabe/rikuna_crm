const express = require('express');
const route = express.Router();
const { authToken, authRole } = require('../middlewares/auth');
const { CreateUser, ReadUsers, EditUser, DeleteUser } = require('../controllers/users/userCtl');
const { Roles } = require('../configurations/Roles');

route.get('/api/user/:id?', authToken, authRole(), ReadUsers);
route.post('/api/register/user', authToken, authRole(), CreateUser);
route.put('/api/user/:id', authToken, authRole(), EditUser);
route.delete('/api/user/:id', authToken, authRole(), DeleteUser);



module.exports = route;