const { sequelize } = require("../../models/sequelize");
const { Op } = require("sequelize");
const { getFullDateWithTime, getFullDate } = require("../../utils/dates");
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
    } else if (tipoMenuData.menu == "Vegetariano") {
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
  let ordenData;
  const { search } = req.query;
  let dateInicio = "00:00:00";
  let dateFin = "23:59:59";
  // console.log("Fecha inicio ", getFullDate(dateInicio));
  // console.log("Fecha fin", getFullDate(dateFin));
  try {
    if (search == 'pendiente') {
      ordenData = await orden.findAll({
        include: { model: tipo_menu, as: "tipo_menu", where: { estado: "A" } },
        where: { hora_salida: null },
        order: [["created", "DESC"]],
      });
    } else if (search == 'enEntrega') {
      ordenData = await orden.findAll({
        include: { model: tipo_menu, as: "tipo_menu", where: { estado: "A" } },
        where: { estado: 0 },
        order: [["created", "DESC"]],
      });
    } else if (search == 'entregado') {
      ordenData = await orden.findAll({
        include: { model: tipo_menu, as: "tipo_menu", where: { estado: "A" } },
        where: { estado: 1 },
        order: [["created", "DESC"]],
      });
    } else {
      ordenData = await orden.findAll({
        include: { model: tipo_menu, as: "tipo_menu", where: { estado: "A" } },
        where: {
          created: {
            [Op.between]: [getFullDate(dateInicio), getFullDate(dateFin)],
          },
        },
        order: [["created", "DESC"]],
      });
    }
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
  const action = req.query.action;

  try {
    const orderData = await orden.findOne({
      where: { orden_id: orderId },
    });

    if (!orderData) {
      return res.status(400).json({ error: "NO EXISTE EL MENU" });
    }

    if (action === 'salida') {
      orderData.hora_salida = getFullDateWithTime();
    } else if (action === 'entrega') {
      orderData.estado = 1;
      orderData.hora_entrega = getFullDateWithTime();
    }
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
