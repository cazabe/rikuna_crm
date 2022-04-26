const { sequelize } = require("../../models/sequelize");
const { getFullDateWithTime } = require("../../utils/dates");
const { ingreso } = sequelize.models;

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

const getIncome = async (req, res) => {
  try {
    const resp = await ingreso.findAll();
    if (!resp) {
      return res.status(400).end();
    }
    res.status(200).json({ data: resp });
  } catch (error) {
    console.log(error);
    return res.status(500).send('ERROR DE SERVIDOR');
  }
}

const updateIncome = async (req, res) => {
  const incomeId = req.params.id;
  if (!incomeId) {
    return res.status(409).end()
  }
  try {
    const income = await ingreso.findOne({
      where: { id_ingreso: incomeId }
    });
    if (!income) {
      return res.status(400).end();
    }
    income.estado = 'A';
    income.save();
    return res.status(200).end();

  } catch (error) {
    console.log(error);
    return res.status(500).send('ERROR DE SERVIDOR');
  }
}

module.exports = {
  addIngress,
  getIncome,
  updateIncome
};
