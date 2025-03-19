import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import DetailsScreen from '../screens/DetailsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='DetailsScreen'
                component={DetailsScreen}
                options={({ route }) => ({
                    title: route.params?.title
                })}
            />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: '#38526d' },
            tabBarInactiveTintColor: '#fff',
            tabBarActiveTintColor: '#008b8b'
        }}>
            <Tab.Screen
                name='Home2'
                component={HomeStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                        backgroundColor: '#38526d'
                    },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name='home-outline' color={color} size={verticalScale(14)} />
                    )
                })}
            />
            {/* <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name='shopping-bag' color={color} size={verticalScale(14)} />
                    )
                }} /> */}
            {/* <Tab.Screen
                name='Favorites'
                component={FavoriteScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name='heart' color={color} size={verticalScale(14)} />
                    )
                }} /> */}
        </Tab.Navigator>
    );
}

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    
    if (routeName === 'DetailsScreen') {
        return 'none';
    }
    return 'flex';
};


export default TabNavigator;