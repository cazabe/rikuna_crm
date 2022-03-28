const { sequelize } = require('../../models/sequelize');
const { getFullDateWithTime } = require('../../utils/dates');
const { rol } = sequelize.models;

const CreateRole = async (req, res) => {
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

const GetRole = async (req, res) => {

}

const EditRole = async (req, res) => {

}

const DeleteRole = async (req, res) => {

}




module.exports = {
    CreateRole,
    GetRole,
    EditRole,
    DeleteRole,
}