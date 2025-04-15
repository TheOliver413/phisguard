import React from 'react';
import { useColorScheme } from 'react-native';
import MomentsScreen from '../screens/MomentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();

// Theme colors for light and dark mode
const theme = {
    light: {
        background: '#FFFFFF',
        text: '#333333',
        activeBackground: '#008b8b',
        activeTint: '#FFFFFF',
        inactiveTint: '#333333',
        drawerBackground: '#FFFFFF',
        headerBackground: '#FFFFFF',
        borderColor: '#E1E1E1',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        activeBackground: '#02BEBE',
        activeTint: '#FFFFFF',
        inactiveTint: '#AAAAAA',
        drawerBackground: '#1E1E1E',
        headerBackground: '#1E1E1E',
        borderColor: '#333333',
    }
};

const AppStack = () => {
    const colorScheme = useColorScheme();
    
    // Default to light if colorScheme is null
    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} theme={currentTheme} />}
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: { 
                    marginLeft: scale(-10), 
                    fontFamily: 'Roboto-Medium', 
                    fontSize: verticalScale(10) 
                },
                drawerActiveBackgroundColor: currentTheme.activeBackground,
                drawerActiveTintColor: currentTheme.activeTint,
                drawerInactiveTintColor: currentTheme.inactiveTint,
                drawerStyle: {
                    backgroundColor: currentTheme.drawerBackground,
                    borderRightColor: currentTheme.borderColor,
                    borderRightWidth: 1,
                },
                headerStyle: {
                    backgroundColor: currentTheme.headerBackground,
                    shadowColor: 'transparent', // iOS
                    elevation: 0, // Android
                },
                headerTintColor: currentTheme.text,
            }}>
            <Drawer.Screen
                name='Home'
                component={TabNavigator}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name='home-outline' size={verticalScale(15)} color={color} />
                    )
                }}
            />
            {/* <Drawer.Screen
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
            /> */}
        </Drawer.Navigator>
    );
};

export default AppStack;