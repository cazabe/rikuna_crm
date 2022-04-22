import { api } from "../network";
import headers from "../headers";

const _getTipoMenu = async () => {
  const resp = await api.get("/tipo/menu", { headers: headers() });
  if (resp && resp.status !== 200) {
    throw new Error("ERROR AL CONSULTAR LOS DATOS");
  }
  return resp.data.data;
};
// const _getMenuId = async () => {
//   const resp = await api.get(`/tipo/menu/${id}`, { headers: headers() });
//   if (resp && resp.status !== 200) {
//     throw new Error("ERROR AL CONSULTAR LOS DATOS");
//   }
//   return resp.data.data;
// };

export { _getTipoMenu };
