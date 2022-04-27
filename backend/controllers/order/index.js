const { sequelize } = require("../../models/sequelize");
const { Op } = require("sequelize");
const { getFullDateWithTime } = require("../../utils/dates");
const { orden, tipo_menu } = sequelize.models;
const { addIngress } = require("../ingress");

const CreateOrder = async (req, res) => {
  const { nombre, cantidad, tipoMenu, comentario } = req.body;
  let valorTipoMenu = 0.0;

  if (!nombre || !cantidad || !tipoMenu) {
    return res
      .status(409)
      .json({ message: "TODOS LOS CAMPOS SON OBLIGATORIOS" });
  }

  try {
    const tipoMenuData = await tipo_menu.findOne({
      where: { tipo_menu_id: tipoMenu },
    });

    if (!tipoMenuData) {
      return res.status(400).json({ message: "NO EXISTE EL TIPO DE MENU" });
    }

    if (tipoMenuData.menu == "Normal") {
      valorTipoMenu = tipoMenuData.precio_unitario;
    } else if (tipoMenuData.menu == "Saludable") {
      valorTipoMenu = tipoMenuData.precio_unitario;
    }

    const total = Number(valorTipoMenu) * cantidad;


    const dataOrder = {
      nombre_cliente: nombre.toLowerCase(),
      cantidad: cantidad,
      tipo_menu_id: tipoMenu,
      comentario: comentario,
      total: total,
      created: getFullDateWithTime(),
    };

    await orden.create(dataOrder);
    addIngress(nombre, total);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR DE SERVIDOR" });
  }
};

const ReadOrder = async (req, res) => {
  try {
    const ordenData = await orden.findAll({
      include: { model: tipo_menu, as: "tipo_menu", where: { estado: "A" } },
      order: [["created", "DESC"]],
    });
    if (!ordenData) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: ordenData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
  }
};

const UpdateOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderData = await orden.findOne({
      where: { orden_id: orderId },
    });

    if (!orderData) {
      return res.status(400).json({ error: "NO EXISTE EL MENU" });
    }

    orderData.estado = "E";
    orderData.hora_entrega = getFullDateWithTime();

    await orderData.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "ERROR DE SERVIDOR" });
  }
};

module.exports = {
  CreateOrder,
  ReadOrder,
  UpdateOrder,
};
