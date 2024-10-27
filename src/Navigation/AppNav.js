import { View, Text } from 'react-native'
import React from 'react'
import AppStack from './AppStack';
import AuthStack from './AuthStack';

import { NavigationContainer } from '@react-navigation/native';

const AppNav = () => {
    return (
        <NavigationContainer>
            <AppStack />
            <AuthStack />
        </NavigationContainer>
    )
}

export default AppNav