import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/auth/index";
import Clientorder from "./views/publicLanding/ClientOrder";
import Dashboard from "./views/dashboard";
import "./App.css";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Clientorder />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/dashboard/*" exact element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
