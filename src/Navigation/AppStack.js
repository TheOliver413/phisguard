import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import MomentsScreen from '../screens/MomentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: { marginLeft: scale(-10), fontFamily: 'Roboto-Medium', fontSize: verticalScale(10) },
                drawerActiveBackgroundColor: '#008b8b',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#333'
            }}>
            <Drawer.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='home-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='person-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name='Messages'
                component={MessagesScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='chatbox-ellipses-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name='Moments'
                component={MomentsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='timer-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='settings-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default AppStack