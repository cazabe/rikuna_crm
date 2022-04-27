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

export { _getInv };
