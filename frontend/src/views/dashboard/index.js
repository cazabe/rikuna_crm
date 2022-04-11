import React, { useEffect } from 'react';
import { useCentralContext } from '../../centralContext.js';
import { chkToken } from '../../services/chkToken.js'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const userContext = useCentralContext();
    const navigate = useNavigate();

    useEffect(() => {
        const hasToke = chkToken();
        if (!hasToke) {
            navigate('/login');
        }
    }, [navigate]);

    console.log('Rol que viene de user context', userContext);
    return (
        <div>
            Dashboard
        </div>
    );
}

export default Dashboard;