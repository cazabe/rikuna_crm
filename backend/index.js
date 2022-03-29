const theEnv = require('dotenv').config();
if (theEnv.error) {
    throw theEnv.error;
}

const { sequelize } = require('./models/sequelize');
var initModels = require("./models/init-models");   // UNCOMMENT THIS LINES WHEN MODELS 
initModels(sequelize); //HAVE BEEN GENERATED WITH sequelize-auto

const express = require('express');
const cors = require('cors');
const route = require('./routes');
const app = express();

//root middlewares
app.use(cors());
app.use(express.json());
app.use(route);

//Conection port global variable 
const PORT = process.env.PORT || 8000;

//sequelize auth database conection
// Check DB connection
sequelize.authenticate().then(() => {
    console.log('DB connection OK!');
}).catch(err => {
    console.error('DB connection ERROR:', err);
});

//lift server up
app.listen(PORT, () => {
    console.log("server runnig on port ", PORT);
})

module.exports = app;