const { sequelize } = require('../../models/sequelize');
const bcrypt = require('bcrypt');
const { getFullDateWithTime } = require('../../utils/dates');
const { users, rol } = sequelize.models;

const Login = async (req, res) => {

}


const Register = async (req, res) => {

}

const Createrole = async (req, res) => {
    console.log("Llegue hasta aquiii");
    const { roles } = req.body;
    if (!roles) {
        return res.status(409).end();
    }

    const data = {
        rol: roles,
        estado: 'A',
        created: getFullDateWithTime()
    }


    try {
        await rol.create(data);
        return res.status(200).end();
    } catch (e) {
        console.log(e);
    }
}

const DeleteRole = async (req, res) => {

}


module.exports = {
    Login,
    Register,
    Createrole,
    DeleteRole
}