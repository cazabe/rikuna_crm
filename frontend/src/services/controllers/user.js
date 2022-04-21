import { api } from "../network";

const _getUser = async () => {
  const resp = await api.get("/user");
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};
const _createUser = async () => {
  const resp = await api.post("/register/user");
  if (resp && resp.status !== 200) {
    throw new Error("Error al crear usuario");
  }
};

export { _getUser, _createUser };
