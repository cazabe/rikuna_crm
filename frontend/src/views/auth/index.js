import React, { useState, useEffect, useCallback } from 'react';
import { useCentralContext } from '../../centralContext';
import { _login } from '../../services/controllers/auth';
import { chkToken } from '../../services/chkToken.js'
import headers from '../../services/headers.js';
import { api } from '../../services/network.js';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LoginImg } from '../../Assets/Chef.svg';
import "./login.css";


const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useCentralContext();

    // Check server response and grants access
    const setContextAndLetPass = useCallback(
        (response) => {
            if (!response) {
                return;
            }

            if (response) {
                userContext.updateRole(response.r);
                userContext.updateUser(response.u);
                userContext.updateIsLogged(true);

                if (response.t) {
                    localStorage.setItem("token", response.t);
                }
            }
            navigate("/dashboard");
        },
        [userContext, navigate]
    );

    const verifyToken = useCallback(async () => {
        const token = chkToken();

        if (token == null) {
            return;
        }

        if (userContext.isLogged === true) {
            navigate("/dashboard");
            return;
        }

        try {
            //TODO make auth route like the one in tagexpress admin
            const response = await api.post(
                "/v1/auth/ack",
                {},
                {
                    headers: headers(),
                }
            );

            setContextAndLetPass(response);
        } catch (error) { }
    }, [userContext, navigate, setContextAndLetPass]);

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !password) {
            return alert('Todos los campos son obligatorios');
        }

        const userdata = {
            username: user,
            password: password
        }

        const resp = await _login(userdata);
        console.log(resp);
        if (!resp) {
            alert('Error al iniciar session, intente de nuevo');
        }

        userContext.updateRole(resp.r);
        userContext.updateUser(resp.u);
        userContext.updateIsLogged(true);

        localStorage.setItem('token', resp.t)
        navigate('/dashboard');
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