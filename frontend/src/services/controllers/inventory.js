import { api } from "../network";
import headers from "../headers";

const _getInv = async () => {
  const resp = await api.get("/products", { headers: headers() });
  if (resp.status === 200) {
    return resp;
  } else {
    return false;
  }
};

const _createInv = async (producto, cantidad, descripcion) => {
  const data = {
    producto: producto,
    cantidad: cantidad,
    descripcion: descripcion,
  };
  const resp = await api.post("/inventory/product", data, {
    headers: headers(),
  });
  if (resp && resp.status !== 200) {
    throw new Error("Error al crear usuario");
  }
};

export { _getInv, _createInv };
