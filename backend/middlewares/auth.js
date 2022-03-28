const { sequelize } = require('../models/sequelize');
const jwt = require('jsonwebtoken');
const { rol } = sequelize.models;

const authToken = async (req, res, next) => {
    let userId;

    try {
        const token = req.headers.authorization.split(" ")[1]; // Authorization header format: 'Bearer <THE TOKEN>'

        jwt.verify(token, process.env.JWT_SALT, (err, decoded) => {
            if (err) {
                throw "Invalid token data";
            }

            // console.log('TOKEN VALIDO')
            userId = decoded.id;
        });

        if (!userId) {
            throw "Invalid token data";
        }

        // Get user and its role data
        const user = await usuario.findOne({
            where: {
                usuario_id: userId,
                estado: "A",
            },
            include: [{ model: rol, where: { estado: "A" } }],
        });

        if (!user) {
            throw "USUARIO_NO_ENCONTRADO";
        }

        // Send user to next middleware
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({ status: "ERROR", data: "NO_AUTENTICADO" });
    }
}

module.exports = {
    authToken
}