import { api } from "../network";
import headers from "../headers";

const _postOrder = async (fullName, quantity, menuType, comentario) => {
    const data = {
        nombre: fullName,
        cantidad: quantity,
        tipoMenu: menuType,
        comentario: comentario
    }
    const resp = await api.post('/order', data)
    if (resp.status === 200) {
        return true;
    } else {
        return false;
    }
}


const _gettOrder = async () => {
    const resp = await api.get('/order', { headers: headers() })
    if (resp.status === 200) {
        return resp;
    } else {
        return false;
    }
}


const _updateOrder = async (id, action) => {
    const resp = await api.put(`/order/${id}?action=${action}`, {}, { headers: headers() })
    if (resp.status === 200) {
        return resp;
    } else {
        return false;
    }
}

export {
    _postOrder,
    _gettOrder,
    _updateOrder
}