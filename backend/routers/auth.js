const express = require('express');
const route = express.Router();
const { Createrole } = require('../controllers/auth/authCtrl');

route.post('/api/register',);
route.post('/api/role', Createrole);



module.exports = route;