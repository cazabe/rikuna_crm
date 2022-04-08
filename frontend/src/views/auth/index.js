import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as LoginImg } from '../../Assets/Chef.svg';
import "./login.css";

const handleSubmit = () => {
    console.log("enviando");
}

const Login = () => {
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
                                    onChange={(e) => console.log("press")}
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
                                    onChange={(e) => console.log("press")}
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