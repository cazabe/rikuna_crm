import { api } from "../network";
import headers from "../headers";


const _getMenu = async () => {
    const resp = await api.get('/menu');
    if (resp && resp.status !== 200) {
        throw new Error("ERROR AL CONSULTAR LOS DATOS");
    }
    return resp.data.data
}

const _getTipoMenu = async () => {
    const resp = await api.get('/tipo/menu');
    if (resp && resp.status !== 200) {
        throw new Error("ERROR AL CONSULTAR LOS DATOS");
    }
    return resp.data.data
}

const _createMenu = async (data, id) => {
    const resp = await api.put(`/menu/${id}`, data, { headers: headers() });
    if (resp && resp.status !== 200) {
        throw new Error("ERROR AL ACTAULIZAR EL MENU");
    }
    return true
}

export {
    _getMenu,
    _getTipoMenu,
    _createMenu
}