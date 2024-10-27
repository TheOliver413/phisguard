import React from 'react'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name='Onboarding'
                component={OnBoardingScreen}
            />
            <Stack.Screen
                name='Login'
                component={LoginScreen}
            />
            <Stack.Screen
                name='Register'
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthStack