const { sequelize } = require("../../models/sequelize");
const { getFullDateWithTime } = require("../../utils/dates");
const { ingreso, orden } = sequelize.models;

async function addIngress(nombre, total) {
  let totalIngress = 0;
  try {
    const nombreIngress = await ingreso.findOne({
      where: { nombre_cliente: nombre },
    });

    if (!nombreIngress) {
      const dataIngress = {
        nombre_cliente: nombre,
        total: total,
        created: getFullDateWithTime(),
        estado: "P",
      };
      console.log(dataIngress);

      await ingreso.create(dataIngress);
      return;
    } else if (nombreIngress.nombre_cliente === nombre) {
      totalIngress = nombreIngress.total;
      nombreIngress.total = Number(totalIngress) + Number(total);
      nombreIngress.updated = getFullDateWithTime();
      await nombreIngress.save();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addIngress,
};
