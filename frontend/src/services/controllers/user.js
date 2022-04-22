import { api } from "../network";
import headers from "../headers";

const _getUser = async () => {
  const resp = await api.get("/user", { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};
const _createUser = async (username, password, correo, rol_id) => {
  const data = {
    user: username,
    password: password,
    email: correo,
    userRol: rol_id,
  };
  const resp = await api.post("/register/user", data, { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("Error al crear usuario");
  }
};

const _getRol = async () => {
  const resp = await api.get("/role", { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};

const _updateUser = async (data, id) => {
  const resp = await api.put(`/user/${id}`, data, { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("Error al modificar usuario");
  }
};

export { _getUser, _createUser, _getRol, _updateUser };
