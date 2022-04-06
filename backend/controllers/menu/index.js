const { sequelize } = require('../../models/sequelize');
const { Op } = require("sequelize");
const { getFullDateWithTime, getFullDate } = require('../../utils/dates');
const { menu, tipo_menu } = sequelize.models;

const CreateMenu = async (req, res) => {
    const { proteina, sopa, carbohidrato, ensalada, postre, jugo, tipo_menu_id } = req.body;
    const user = req.user;

    if (!proteina || !carbohidrato || !ensalada || !postre || !jugo) {
        return res.status(409).json({ message: 'TODOS LOS CAMPOS SON OBLIGATORIOS' });
    }

    const dataMenu = {
        proteina: proteina,
        sopa: sopa,
        carbohidrato: carbohidrato,
        ensalada: ensalada,
        postre: postre,
        jugo: jugo,
        created: getFullDateWithTime(),
        user_id: user.user_id,
        tipo_menu_id: tipo_menu_id
    }

    try {
        await menu.create(dataMenu);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'ERROR DE SERVIDOR' });
    }
};

const ReadMenu = async (req, res) => {
    try {
        const menudata = await menu.findAll({
            include: { model: tipo_menu, as: 'tipo_menu', where: { estado: 'A' } },
            order: [["created", "DESC"]],
        });
        if (!menudata) {
            return res.status(400).end();
        }
        return res.status(200).json({ data: menudata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

const UpdateMenu = async (req, res) => {
    const menuId = req.params.id
    const { proteina, sopa, carbohidrato, ensalada, postre, jugo } = req.body;

    try {
        const menuData = await menu.findOne({
            where: { id_menu: menuId }
        });

        if (!menuData) {
            return res.status(400).json({ error: 'NO EXISTE EL MENU' });
        }

        menuData.proteina = proteina ? proteina : menuData.proteina;
        menuData.sopa = sopa ? sopa : menuData.sopa;
        menuData.carbohidrato = carbohidrato ? carbohidrato : menuData.carbohidrato;
        menuData.ensalada = ensalada ? ensalada : menuData.ensalada;
        menuData.postre = postre ? postre : menuData.postre;
        menuData.jugo = jugo ? jugo : menuData.jugo;

        await menuData.save();
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'ERROR DE SERVIDOR' });
    }
}


module.exports = {
    CreateMenu,
    ReadMenu,
    UpdateMenu
}