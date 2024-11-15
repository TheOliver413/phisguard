import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const login = (email, password) => {
        setLoading(true);
        axios.post(`${BASE_URL}/login`, { email, password })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                setUserToken(userInfo.access_token);

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.access_token);
                setLoading(false);
                // Mostrar el mensaje de éxito
                Alert.alert(
                    'Login exitoso',
                    `Bienvenido ${userInfo.user.username ? userInfo.user.username : '' }`, // Asegúrate de cambiar el nombre de la propiedad
                    [{ text: 'OK' }]
                );
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setLoading(false);
                // Mostrar el mensaje de error
                Alert.alert(
                    'Error de Login',
                    'Credenciales incorrectas o error en el servidor',
                    [{ text: 'OK' }]
                );
            });
        setLoading(false);
    }

    const logout = () => {
        setLoading(true);
        setUserInfo(null);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setLoading(false);
        Alert.alert(
            'Sesión Cerrada',
            'Has cerrado sesión exitosamente.',
            [{ text: 'OK' }]
        );
    }

    const isLoggedIn = async () => {
        try {
            setLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
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