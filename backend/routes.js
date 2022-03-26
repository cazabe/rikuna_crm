const express = require('express');
const route = express.Router();
const auth = require('./routers/auth');


route.use(auth);


module.exports = route;

