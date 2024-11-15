import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const login = (email, password) => {
        setLoading(true);
        axios.post(`${BASE_URL}/login`, { email, password })
            .then(res => {
                console.log(JSON.stringify(res.data));
                // Aquí puedes guardar el token y el estado de autenticación
                let userInfo = res.data;
                setUserToken(userInfo.access_token);

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.access_token);
                setLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setLoading(false);
            });
        setLoading(false);
    }

    const logout = () => {
        setLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            userInfo = JSON.parse(userInfo);

            if( userInfo){
                setUserToken(userToken);
                setUserInfo(userInfo);            }
            setLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}