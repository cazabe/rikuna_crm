const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');
const user = require('./routers/user');
const role = require('./routers/role');
const inventory = require('./routers/inventory');
const tipoMenu = require('./routers/tipoMenu');
const menu = require('./routers/menu');


route.use(auth);
route.use(user);
route.use(role);
route.use(inventory);
route.use(tipoMenu);
route.use(menu);


module.exports = route;

