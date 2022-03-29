const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');
const user = require('./routers/user');

route.use(auth);
route.use(user);


module.exports = route;

