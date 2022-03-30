const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');
const user = require('./routers/user');
const role = require('./routers/role');

route.use(auth);
route.use(user);
route.use(role);


module.exports = route;

