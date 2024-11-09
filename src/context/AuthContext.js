import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    
    const login = () => {
        setLoading(true);
        setUserToken('asdf');
        AsyncStorage.setItem('userToken', 'iasidasidiasid');
        setLoading(false);
    }

    const logout = () => {
        setLoading(true);   
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}