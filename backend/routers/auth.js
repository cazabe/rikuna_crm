const express = require('express');
const route = express.Router();
const { authToken } = require('../middlewares/auth')
const { Login, chkLogged } = require('../controllers/auth/authCtrl');

route.post('/api/login', Login);
route.post('/api/auth/chklogged', authToken, chkLogged);



module.exports = route;