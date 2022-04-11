import React, { createContext, useContext, useState } from "react";

export const CentralContext = createContext();

export function useCentralContext() {
    return useContext(CentralContext);
}

export function CentralContextProvider({ children }) {
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    function updateRole(newRole) {
        setRole(newRole);
    }

    function updateUser(newUser) {
        setUser(newUser);
    }

    function updateIsLogged(newIsLogged) {
        setIsLogged(newIsLogged);
    }

    let contextData = {
        role,
        user,
        isLogged,
        updateRole,
        updateUser,
        updateIsLogged,
    };

    return (
        <CentralContext.Provider value={contextData}>
            {children}
        </CentralContext.Provider>
    );
}


