import React from 'react'
import HomeScreen from '../screens/HomeScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen
                name='Home'
                component={HomeScreen}
            />
        </Drawer.Navigator>
    )
}

export default AppStack