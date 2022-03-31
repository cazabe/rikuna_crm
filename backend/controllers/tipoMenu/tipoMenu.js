const {sequelize} = require('../../models/sequelize')
const { UniqueConstraintError } = require('sequelize');
const { getFullDateWithTime } = require('../../utils/dates');
const { tipo_menu } = sequelize.models

const createMenu = async (req, res) => {
    try {
        const { menu, precio_unitario } = req.body

        if(!menu || !precio_unitario ) {
            return res
            .status(409)
            .json({
                status: 409,
                message: 'Campos requeridos',
                error: 'Conflicts',
            })
            .end();
        }

        const data = {
            menu: menu,
            precio_unitario: precio_unitario,
            created: getFullDateWithTime(),
            estado: 'A'
        }

        await tipo_menu.create(data);

        res.status(200).json({
            status: "OK",
            message: "Menu creado correctamente",
          });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}

const getMenu = async (req, res) => {
    try {
        const menus = await tipo_menu.findAll({
            where: {estado: 'A'}
        })
        return res.status(200).json({ status: 'OK', data: menus });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

const getOneMenu = async (req, res) => {
    try {
        let id = req.params.id;
        const menus = await tipo_menu.findOne({
            where: {tipo_menu_id: id}
        })
        return res.status(200).json({ status: 'OK', data: menus });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

const updateMenu = async (req, res) => {
    try {
        const { menu, precio_unitario } = req.body
        const id = req.params.id

        if(!menu || !precio_unitario) {
            return res
            .status(200)
            .json({
                message: "Campos requeridos",
                error: "Conflicts",
            })
            .end();
        }

        const data = {
            menu,
            precio_unitario,
            updated: getFullDateWithTime()
        }

        await tipo_menu.update(data,{
            where: {tipo_menu_id : id},
        });

        res.status(200).json({
            status: "OK",
            message: "Menu actualizado",
          });

    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            res.status(403).json({ status: 'ERROR', data: 'menu_YA_EXISTE' });
          } else {
            res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
          }
    }
}

module.exports = {
    createMenu,
    getMenu,
    getOneMenu,
    updateMenu
}