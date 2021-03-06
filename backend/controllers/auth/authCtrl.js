const { sequelize } = require('../../models/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getFullDateWithTime } = require('../../utils/dates');
const { users, rol } = sequelize.models;

const Login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(409).json({ message: "TODOS LOS CAMPOS SON OBLIGATORIOS" });
    }

    try {
        const user = await users.findOne({
            where: {
                username: username,
                estado: 'A'
            },
            include: { model: rol, as: 'rol', where: { estado: 'A' } }
        });

        if (!user) {
            return res.status(401).end();
        }

        // Compare BD and frontend password 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ status: 'ERROR', data: 'CREDENCIALES_INVALIDAS' });
        }


        // Create and send JWT
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SALT, { expiresIn: '12h' });
        user.fecha_ultimo_ingreso = getFullDateWithTime();
        user.save();

        res.status(200).json({ status: "autorizado", data: { t: token, r: user.rol.rol, u: user.username } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

/* Returns the user role and username. It's used to auto-login a user that has a token.
 A Request will get to this point only if the token is valid, ensuring that then user should have
 access at the frontend login.
 */
const chkLogged = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ status: 'autorizado_ok', data: { r: user.rol.rol, u: user.username } });
    }
    catch (e) {
        res.status(401).json({ status: 'ERROR', data: 'NO_AUTORIZADO' });
    }
}

module.exports = {
    Login,
    chkLogged
}