import { api } from "../network";
import headers from "../headers";


const _getIncome = async () => {
    const resp = await api.get('/income', { headers: headers() })
    if (resp.status === 200) {
        return resp;
    } else {
        return false;
    }
}


const _updateIncome = async (id) => {
    const resp = await api.put(`/income/${id}`, {}, { headers: headers() })
    if (resp.status === 200) {
        return resp;
    } else {
        return false;
    }
}

export {
    _getIncome,
    _updateIncome
}