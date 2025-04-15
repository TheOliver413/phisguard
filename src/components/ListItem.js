import React from 'react';
import { Text, TouchableOpacity, View, Image, useColorScheme } from 'react-native';
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import { windowWidth } from '../utils/Dimensions';

// Theme colors for light and dark mode
const theme = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        secondaryText: '#333333',
        primary: '#008b8b',
        cardBackground: '#FFFFFF',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        primary: '#02BEBE',
        cardBackground: '#1E1E1E',
    }
};

export default function ListItem({ image, title, description, onPress, customTheme }) {
    const defaultImage = require('../assets/images/default-news.jpg');
    const colorScheme = useColorScheme();
    
    // Use customTheme if provided, otherwise use the system theme
    // Default to light if colorScheme is null
    const currentTheme = customTheme || (colorScheme === 'dark' ? theme.dark : theme.light);

    return (
        <View style={[styles.container, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.list}>
                <Image
                    source={image && image.startsWith('http') ? { uri: image } : defaultImage}
                    style={styles.img}
                    onError={(e) => console.log("Error cargando la imagen:", e.nativeEvent.error)}
                />
                <View style={styles.texts}>
                    <Text 
                        numberOfLines={2} 
                        style={[styles.itemName, { color: currentTheme.text }]}
                    >
                        {title}
                    </Text>
                    <Text 
                        numberOfLines={2} 
                        style={[styles.subtitle, { color: currentTheme.secondaryText }]}
                    >
                        {description}
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                onPress={onPress} 
                style={[styles.btn, { backgroundColor: currentTheme.primary }]}
            >
                <Text style={styles.btnText}>Leer más</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10@vs',
        padding: '8@vs',
        borderRadius: '10@ms',
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: '50@s',
        height: '50@vs',
        borderRadius: '10@ms',
        marginRight: '5@s'
    },
    texts: {
        width: '75%'
    },
    itemName: {
        fontFamily: 'Roboto-Medium',
        fontSize: '12@vs',
        textTransform: 'uppercase',
        marginBottom: '2@vs',
    },
    subtitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: '10@vs',
    },
    btn: {
        padding: '8@vs',
        width: '80@vs',
        borderRadius: '10@ms'
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: '12@vs'
    }
});