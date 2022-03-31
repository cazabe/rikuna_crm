const { sequelize } = require('../../models/sequelize');
const bcrypt = require('bcrypt');
const { getFullDateWithTime } = require('../../utils/dates');
const { users, rol } = sequelize.models;

const GetUsers = async (req, res) => {

}

const CreateUser = async (req, res) => {
    const { user, password, email, userRol } = req.body

    if (!user || !password || !email || !userRol) {
        res.status(409).end();
        console.log('entre aqui');
    }

    try {
        const user_rol = await rol.findOne({
            where: { rol_id: userRol }
        });

        if (!user_rol) {
            res.status(400).json({ Message: 'ROL_NO_EXISTE' }).end();
        }

        const hash = await bcrypt.hash(password, 10);

        const data = {
            username: user,
            password: hash,
            correo: email,
            estado: 'A',
            created: getFullDateWithTime(),
            rol_id: user_rol.rol_id
        }

        await users.create(data);
        return res.status(200).end();
    } catch (error) {
        // console.log(error);
        res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}

const DeleteUser = async (req, res) => {

}


module.exports = {
    GetUsers,
    CreateUser,
    DeleteUser,
}