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

const ReadRole = async (req, res) => {
    try {
        const roldata = await rol.findAll({
            where: { estado: "A" }
        });
        if (!roldata) {
            return res.status(400).end();
        }
        return res.status(200).json({ data: roldata });
    } catch (error) {
        return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}

const UpdatetRole = async (req, res) => {
    const { id } = req.params;
    const { newRol, estado } = req.body;
    try {
        const rolData = await rol.findOne({
            where: { rol_id: id }
        })

        if (!rolData) {
            return res.status(400).json({ message: "ROL_NO_ENCONTRADO" });
        }

        rolData.rol = newRol ? newRol : rolData.rol;
        rolData.estado = estado ? estado : rolData.estado;

        await rolData.save();
        return res.status(200).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}

const DeleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const rolData = await rol.findOne({
            where: { rol_id: id }
        })

        if (!rolData) {
            return res.status(400).json({ message: "ROL_NO_ENCONTRADO" });
        }

        rolData.estado = "I";

        await rolData.save()
        return res.status(200).end();

    } catch (error) {
        return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}




module.exports = {
    CreateRole,
    ReadRole,
    UpdatetRole,
    DeleteRole,
}