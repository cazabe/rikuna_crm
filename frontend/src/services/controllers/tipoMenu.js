import { api } from "../network";
import headers from "../headers";

const _getTipoMenu = async () => {
  const resp = await api.get("/tipo/menu", { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};
const _getOneTipoMenu = async (id) => {
  const resp = await api.get(`/tipo/menu/${id}`, { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};

const _createMenu = async (menu, precio) => {
  const data = {
    menu: menu,
    precio_unitario: precio,
  };
  const resp = await api.post("/tipo/menu", data, { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("Error al crear Tipo de Menu");
  }
};

const _updateTipoMenu = async (id, menu, precio) => {
  const data = {
    menu: menu,
    precio_unitario: precio,
  };
  const resp = await api.put(`/tipo/menu/${id}`, data, { headers: headers() });
  if (resp.status === 200) {
    return resp;
  } else {
    return false;
  }
};

export { _getTipoMenu, _createMenu, _updateTipoMenu, _getOneTipoMenu };
