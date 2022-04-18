import React, { useState, useEffect, useCallback } from 'react';
import { useCentralContext } from '../../centralContext';
import { _login } from '../../services/controllers/auth';
import { api } from '../../services/network';
import headers from '../../services/headers';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LoginImg } from '../../Assets/Chef.svg';
import "./login.css";


const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useCentralContext();

    //check if user has permissions and has a valid token
    const verifyToken = useCallback(async () => {
        try {
            const response = await api.post(
                "/auth/chklogged",
                {},
                {
                    headers: headers(),
                }
            )
            console.log("esp de logged ", response);
            if (response.data.status === 'autorizado_ok') {
                userContext.updateRole(response.data.data.r);
                userContext.updateUser(response.data.data.u);
                navigate('/dashboard');
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }, [navigate, userContext]);


    useEffect(() => {
        verifyToken();
    }, [navigate, verifyToken]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !password) {
            return alert('Todos los campos son obligatorios');
        }

        const userdata = {
            username: user,
            password: password
        }

        try {
            const response = await _login(userdata);
            userContext.updateRole(response.data.data.r);
            userContext.updateUser(response.data.data.u);
            localStorage.setItem("token", response.data.data.t);
        } catch (error) {
            alert("Credenciales invalidas");
        }
    }


    return (
        <>
            <div className="content">
                <div className="content-left">
                    <div className="content-login">
                        <div className="login-header">
                            <h3>Inicio de sesión</h3>
                            <label>
                                ¡Bienvenido de nuevo! Por favor, introduzca sus datos
                            </label>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group first mb-3">
                                <label htmlFor="username" className="form-label">
                                    Usuario:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ingrese su usuario"
                                    className="form-control"
                                    id="username"
                                    onChange={(e) => setUser(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group last mb-4">
                                <label htmlFor="password" className="form-label">
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-login">
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="content-right">
                    {/* <img src={Logo} className="img-logo" alt="login" /> */}
                    {/* <img src={LoginImg} alt="login" /> */}
                    <LoginImg />
                </div>
            </div>
        </>
    )
}

export default Login