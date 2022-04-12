import React, { useEffect } from 'react';
import { useCentralContext } from '../../centralContext.js';
import { chkToken } from '../../services/chkToken.js'
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import Order from './orders/index.js';
import rikuna from '../../Assets/rikunalogo.jpeg'
import './dashboard.css';

const Dashboard = () => {
    const userContext = useCentralContext();
    const navigate = useNavigate();

    useEffect(() => {
        const hasToke = chkToken();
        if (!hasToke) {
            navigate('/login');
        }
        //Dashboard settings
        // To hide the sidebar when an option is clicked (mobile view: < 600px)
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("menu-option-text") && window.screen.width <= 600) {
                document
                    .getElementsByClassName("page-wrapper")[0]
                    .classList.remove("toggled");
            }
        });
        // ___________________NO BORRAR ESTO. SE USARA CUANDO SE IMPLEMENTEN DROPDOWNS__________________
        let dropDowns = document.querySelectorAll(".sidebar-dropdown > span");
        dropDowns.forEach((i) => {
            i.addEventListener("click", function () {

                if (i.parentElement.classList.contains("active")) {

                    if (this.nextElementSibling) {
                        this.nextElementSibling.classList.remove("displayed-submenu");
                    }

                    i.parentElement.classList.remove("active");
                } else {

                    if (this.nextElementSibling) {
                        this.nextElementSibling.classList.add("displayed-submenu");
                    }

                    i.parentElement.classList.add("active");
                }
            });
        });


        // side bar show or hide
        document
            .getElementById("close-sidebar")
            .addEventListener("click", function () {
                document
                    .getElementsByClassName("page-wrapper")[0]
                    .classList.remove("toggled");
            });

        document
            .getElementById("show-sidebar")
            .addEventListener("click", function () {
                document
                    .getElementsByClassName("page-wrapper")[0]
                    .classList.add("toggled");
            });
    }, [navigate]);

    console.log('Rol que viene de user context', userContext);
    return (
        <div>
            <div className="page-wrapper chiller-theme toggled">
                <button id="show-sidebar" className="btn btn-sm btn-dark" style={{ zIndex: 100 }}>
                    <i style={{ color: "#31353D" }} className="fa fa-bars"></i>
                </button>

                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <Link to="/">
                                <img src={rikuna} alt="rikuna logo" style={{ height: "50px" }} />
                            </Link>
                            <div id="close-sidebar">
                                <i className="fa fa-times" style={{ color: "var(--blue)" }}></i>
                            </div>
                        </div>

                        <div className="sidebar-header">
                            <div className="user-info ml-4">
                                <span className="user-name">
                                    {userContext.user}
                                </span>
                                <span className="user-status">
                                    <span style={{ color: "var(--yellow)" }}><strong>En línea</strong></span>
                                </span>
                            </div>
                        </div>

                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span style={{ fontSize: "20px" }}>General</span>
                                </li>

                                {/*Ejemplo de dropdown */}

                                <li className="sidebar-dropdown">
                                    <span style={{ cursor: "pointer" }}>
                                        <Link className="menu-option-text" to="/dashboard/order" >
                                            <i className="fa fa-info"></i>
                                            Ordenes
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-footer pl-2">
                        <div className="text-center">
                            <button
                                onClick={console.log('Cerrar sesion')}
                                style={{ cursor: "pointer" }}
                                className="btonexit bton-sm"
                            >
                                <i className="fa fa-arrow-circle-left pr-2" style={{ fontSize: "18px" }} aria-hidden="true"></i>
                                <strong>Salir</strong>
                            </button>
                        </div>

                    </div>
                </nav >

                <main className="page-content">
                    <div className="container-fluid">
                        <Routes>

                            {/* <Route path="/dashboard/order">
                                <Order />
                            </Route> */}

                            <Route path="/dashboard/order" component={Order} />
                        </Routes>
                    </div>
                </main>
            </div >
        </div>
    );
}

export default Dashboard;