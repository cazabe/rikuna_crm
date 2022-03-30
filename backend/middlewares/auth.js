const { sequelize } = require('../models/sequelize');
const jwt = require('jsonwebtoken');
const { Roles } = require('../configurations/Roles');
const { users, rol } = sequelize.models;

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
        const user = await users.findOne({
            where: {
                user_id: userId,
                estado: "A",
            },
            include: { model: rol, as: 'rol', where: { estado: 'A' } },
        });

        if (!user) {
            throw "USUARIO_NO_ENCONTRADO";
        }
        // Send user to next middleware
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: "ERROR", data: "NO_AUTENTICADO" });
    }
}

// Check if the user is included in the allowed roles
const authRole = (roles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            // Adimn user can access everything
            if (user.rol.rol === Roles.Admin) {
                next();
            } else if (roles.includes(user.rol.rol)) {
                next();
            } else {
                return res.status(401).json({
                    status: "ERROR",
                    data: "NO_AUTORIZADO",
                    message:
                        "No tiene los permisos suficiente para realizar esta acción.",
                    error: "Unauthorized",
                });
            }
        } catch (e) {
            return res.status(401).json({
                status: "ERROR",
                data: "NO_AUTORIZADO",
                message:
                    "No tiene los permisos suficiente para realizar esta acción.",
                error: "Unauthorized",
            });
        }
    };
}

module.exports = {
    authToken,
    authRole
}