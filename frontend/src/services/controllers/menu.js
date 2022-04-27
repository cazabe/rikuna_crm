import { api } from "../network";
import headers from "../headers";

const _getMenu = async () => {
  const resp = await api.get("/menu", { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};

const _getTipoMenu = async () => {
  const resp = await api.get("/tipo/menu");
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};

export { _getMenu, _getTipoMenu };
