const express = require('express');
const route = express.Router();
const { Login } = require('../controllers/auth/authCtrl');

route.post('/api/login', Login);



module.exports = route;