import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import { BASE_URL } from '../../config';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <RegistrationSVG
                        height={300}
                        width={300}
                        style={{ transform: [{ rotate: '-5deg' }] }}
                    />
                </View>

                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        textAlign: 'center',
                    }}
                >
                    Register
                </Text>

                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <GoogleSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <FacebookSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <TwitterSVG height={24} width={24} />
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                    Or, register with email ...
                </Text> */}

                <InputField
                    label={'User Name'}
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                />

                <InputField
                    label={'Email'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                />

                <InputField
                    label={'Password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                />

                <CustomButton label={'Register'} onPress={handleRegister} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}
                >
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#018b8b', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;