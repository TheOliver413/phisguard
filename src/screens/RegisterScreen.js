import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    useColorScheme,
    StatusBar,
} from 'react-native';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import CustomButton from '../components/CustomButton';
import { BASE_URL } from '../../config';
import axios from 'axios';

// Theme colors for light and dark mode
const theme = {
    light: {
        background: '#FFFFFF',
        text: '#333333',
        secondaryText: '#666666',
        border: '#DDDDDD',
        primary: '#018b8b',
        inputBackground: '#F5F5F5',
        statusBar: 'dark-content',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        border: '#444444',
        primary: '#02BEBE',
        inputBackground: '#2A2A2A',
        statusBar: 'light-content',
    }
};

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    
    // Default to light if colorScheme is null
    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    const handleRegister = () => {
        if (!userName || !email || !password) {
            Alert.alert('Error', 'Por favor llena todos los campos');
            return;
        }

        const registrationData = {
            username: userName,
            email: email,
            password: password,
            role: 'user'
        };

        axios.post(`${BASE_URL}/register`, registrationData)
            .then(response => {
                // Verificar si el registro fue exitoso
                if (response.data.msg === "Usuario registrado exitosamente") {
                    Alert.alert('Éxito', response.data.msg); // Mostrar el mensaje exitoso
                    navigation.goBack(); // Regresar a la pantalla de login
                } else {
                    // En caso de que no sea exitoso
                    Alert.alert('Error', 'Registro fallido');
                }
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'Algo salió mal. Por favor inténtalo de nuevo.');
            });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
            <StatusBar barStyle={currentTheme.statusBar} backgroundColor={currentTheme.background} />
            
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.logoContainer}>
                    <RegistrationSVG
                        height={300}
                        width={300}
                        style={styles.logo}
                    />
                </View>

                <Text style={[styles.title, { color: currentTheme.text }]}>
                    Registro
                </Text>

                <InputField
                    label={'Nombre de usuario'}
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={currentTheme.secondaryText}
                            style={styles.inputIcon}
                        />
                    }
                    themeColors={{
                        text: currentTheme.text,
                        background: currentTheme.inputBackground,
                        border: currentTheme.border,
                        placeholder: currentTheme.secondaryText
                    }}
                />

                <InputField
                    label={'Correo electrónico'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color={currentTheme.secondaryText}
                            style={styles.inputIcon}
                        />
                    }
                    keyboardType="email-address"
                    themeColors={{
                        text: currentTheme.text,
                        background: currentTheme.inputBackground,
                        border: currentTheme.border,
                        placeholder: currentTheme.secondaryText
                    }}
                />

                <InputField
                    label={'Contraseña'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={currentTheme.secondaryText}
                            style={styles.inputIcon}
                        />
                    }
                    inputType="password"
                    themeColors={{
                        text: currentTheme.text,
                        background: currentTheme.inputBackground,
                        border: currentTheme.border,
                        placeholder: currentTheme.secondaryText
                    }}
                />

                <CustomButton 
                    label={'Register'} 
                    onPress={handleRegister}
                    themeColors={{
                        background: currentTheme.primary,
                        text: '#FFFFFF'
                    }}
                />

                <View style={styles.loginContainer}>
                    <Text style={{ color: currentTheme.secondaryText }}>
                        Ya registrado?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.loginText, { color: currentTheme.primary }]}>
                            {' Login'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollView: {
        paddingHorizontal: 25,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        transform: [{ rotate: '-5deg' }]
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 28,
        fontWeight: '500',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputIcon: {
        marginRight: 5,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    loginText: {
        fontWeight: '700',
    },
});

export default RegisterScreen;