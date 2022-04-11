import { api } from "../network";

const _login = async (userData) => {
    const resp = await api.post('/login', userData);
    if (resp && resp.status !== 200) {
        throw new Error('ERROR AL INICIAR SESION');
    }
    return resp.data.data;
}

export {
    _login
}