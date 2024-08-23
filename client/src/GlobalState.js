import { createContext, useEffect } from "react";
import ProductAPI from "./components/API/ProductAPI";
import { useState } from "react";
import axios from "axios";
import UserAPI from "./components/API/UserAPI";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    const [token,setToken] = useState(false)

    const refreshToken = async () => {
        const res = await axios.get(`https://ecommerce-website-oiw9.onrender.com/user/refresh_token`)

        setToken(res.data.accesstoken)
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])

    const state = {
        token: [token,setToken],
        productsAPI:ProductAPI(),
        userAPI:UserAPI(token)
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
