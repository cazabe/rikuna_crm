const { sequelize } = require("../../models/sequelize");
const bcrypt = require("bcrypt");
const { getFullDateWithTime } = require("../../utils/dates");
const { users, rol } = sequelize.models;

const CreateUser = async (req, res) => {
  const { user, password, email, userRol } = req.body;

  console.log(user);
  console.log(password);
  console.log(email);
  console.log(userRol);
  if (!user || !password || !email || !userRol) {
    console.log("Aqui");
    return res.status(409).end();
  }

  try {
    const user_rol = await rol.findOne({
      where: { rol_id: userRol },
    });

    if (!user_rol) {
      return res.status(400).json({ Message: "ROL_NO_EXISTE" }).end();
    }

    const hash = await bcrypt.hash(password, 10);

    const data = {
      username: user,
      password: hash,
      correo: email,
      estado: "A",
      created: getFullDateWithTime(),
      rol_id: user_rol.rol_id,
    };

    await users.create(data);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
  }
};

const ReadUsers = async (req, res) => {
  try {
    const usersdata = await users.findAll({
      attributes: { exclude: ["password"] },
      where: { estado: "A" },
    });
    if (!usersdata) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: usersdata });
  } catch (error) {
    return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
  }
};

const EditUser = async (req, res) => {
  const { id } = req.params;
  const { username, correo, estado, rol_id } = req.body;
  try {
    const user = await users.findOne({
      where: { user_id: id },
    });

    if (!user) {
      return res.status(400).json({ message: "USUARIO_NO_ENCONTRADO" });
    }

    user.username = username ? username : user.username;
    user.correo = correo ? correo : user.correo;
    user.estado = estado ? estado : user.estado;
    user.rol_id = rol_id ? rol_id : user.rol_id;
    await user.save();
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await users.findOne({
      where: { user_id: id },
    });

    if (!user) {
      return res.status(400).json({ message: "USUARIO_NO_ENCONTRADO" });
    }
    //We set the state to I so we make a logical delete
    user.estado = "I";
    await user.save();

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
  }
};

module.exports = {
  CreateUser,
  ReadUsers,
  EditUser,
  DeleteUser,
};
