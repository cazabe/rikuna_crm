const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');
const user = require('./routers/user');
const inventory = require('./routers/inventory');
const tipoMenu = require('./routers/tipoMenu');
const role = require('./routers/role');


route.use(auth);
route.use(user);
route.use(role);
route.use(inventory);
route.use(tipoMenu);


module.exports = route;

