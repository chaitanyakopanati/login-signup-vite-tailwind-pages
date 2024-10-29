import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");

    const contextValue = {
        data,
        setData,
        token, 
        setToken
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
