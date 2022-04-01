const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');
const user = require('./routers/user');
<<<<<<< HEAD
const inventory =require('./routers/inventory');
const tipoMenu =require('./routers/tipoMenu');

route.use(auth);
route.use(user);
route.use(inventory);
route.use(tipoMenu);
=======
const role = require('./routers/role');

route.use(auth);
route.use(user);
route.use(role);

>>>>>>> 960b2e720b7a0ed5156b0d32f3d459b8c7ab8e8b

module.exports = route;

