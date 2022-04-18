import React, { createContext, useContext, useState } from "react";

export const CentralContext = createContext();

export function useCentralContext() {
    return useContext(CentralContext);
}

export function CentralContextProvider({ children }) {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    function updateRole(newRole) {
        setRole(newRole);
    }

    function updateUser(newUser) {
        setUser(newUser);
    }

    let contextData = {
        role,
        user,
        updateRole,
        updateUser,
    };

    return (
        <CentralContext.Provider value={contextData}>
            {children}
        </CentralContext.Provider>
    );
}


