import { createContext, useEffect, useState } from "react";
import ProductAPI from "./components/API/ProductAPI";
import UserAPI from "./components/API/UserAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        const accesstoken = localStorage.getItem('accesstoken');
        const refreshtoken = localStorage.getItem('refreshtoken');

        if (firstLogin) {
            if (accesstoken && refreshtoken) {
                // Set tokens if they exist
                setToken(accesstoken);
            } else {
                // Optionally, handle case where tokens are not found
                // For example, refresh tokens or redirect to login
                console.log('Tokens are missing');
            }
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
        userAPI: UserAPI(token),
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
