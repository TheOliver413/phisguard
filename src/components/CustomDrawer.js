import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ImageBackground, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AuthContext } from '../context/AuthContext';

// Theme colors for light and dark mode
const theme = {
    light: {
        background: '#FFFFFF',
        text: '#333333',
        secondaryText: '#666666',
        iconColor: '#333333',
        borderColor: '#CCCCCC',
        drawerBackground: '#FFFFFF',
        headerBackground: '#111524', // Keep the dark header for both themes
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        iconColor: '#DDDDDD',
        borderColor: '#444444',
        drawerBackground: '#1E1E1E',
        headerBackground: '#111524', // Keep the dark header for both themes
    }
};

const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);
    const { userInfo, isLoading } = useContext(AuthContext);
    const colorScheme = useColorScheme();
    
    // Use provided theme or default to system theme
    const currentTheme = props.theme || (colorScheme === 'dark' ? theme.dark : theme.light);

    return (
        <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
            <DrawerContentScrollView 
                {...props} 
                contentContainerStyle={[
                    styles.ContentScrollView, 
                    { backgroundColor: currentTheme.headerBackground }
                ]}
            >
                <ImageBackground 
                    source={require('../assets/images/menu_bg.jpg')} 
                    style={styles.ImageBackground}
                >
                    <Image 
                        source={require('../assets/images/user-profile.jpg')} 
                        style={styles.userImage} 
                    />
                    <Text style={styles.name}>
                        {userInfo && userInfo.user && userInfo.user.username
                            ? `${userInfo.user.username}`
                            : 'Usuario'}
                    </Text>
                </ImageBackground>
                <View style={[styles.itemList, { backgroundColor: currentTheme.drawerBackground }]}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={[styles.footer, { borderTopColor: currentTheme.borderColor }]}>
                <TouchableOpacity onPress={() => {}} style={styles.btn}>
                    <View style={styles.btnContainer}>
                        <Ionicons 
                            name='share-social-outline' 
                            size={verticalScale(15)} 
                            color={currentTheme.iconColor} 
                        />
                        <Text style={[styles.text, { color: currentTheme.text }]}>
                            Próximamente
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logout() }} style={styles.btn}>
                    <View style={styles.btnContainer}>
                        <Ionicons 
                            name='exit-outline' 
                            size={verticalScale(15)} 
                            color={currentTheme.iconColor} 
                        />
                        <Text style={[styles.text, { color: currentTheme.text }]}>
                            Finalizar la sesión
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    ContentScrollView: {
        backgroundColor: '#111524',
    },
    ImageBackground: {
        padding: '10@vs',
    },
    userImage: {
        height: '40@vs',
        width: '40@s',
        borderRadius: 50,
        marginBottom: '5@vs',
    },
    name: {
        color: '#FFF',
        fontSize: '10@vs',
        fontFamily: 'Roboto-Medium',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        color: '#FFF',
        fontSize: '8@vs',
        fontFamily: 'Roboto-Medium',
        marginRight: '5@s',
    },
    icon: {
        color: '#FFF',
    },
    itemList: {
        flex: 1,
        paddingTop: '5@vs',
    },
    footer: {
        padding: '15@vs',
        borderTopWidth: '1@vs',
    },
    btn: {
        paddingVertical: '5@vs',
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: '10@vs',
        fontFamily: 'Roboto-Medium',
        marginLeft: '5@s',
    },
});

export default CustomDrawer;