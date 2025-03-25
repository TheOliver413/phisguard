import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters'
import { windowWidth } from '../utils/Dimensions';

export default function ListItem({ image, title, description, onPress }) {
    const defaultImage = require('../assets/images/default-news.jpg'); // Asegúrate de que la imagen existe


    return (
        <View style={styles.container}>
            <View style={styles.list}>
            <Image
                    source={image && image.startsWith('http') ? { uri: image } : defaultImage}
                    style={styles.img}
                    onError={(e) => console.log("Error cargando la imagen:", e.nativeEvent.error)}
                />
                <View style={styles.texts}>
                    <Text numberOfLines={2} style={styles.itemName}>
                        {title}
                    </Text>
                    <Text numberOfLines={2} style={styles.subtitle}>
                        {description}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <Text style={styles.btnText}>Leer más</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10@vs'
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
        color: '#000',
        fontFamily: 'Roboto-Medium',
        fontSize: '12@vs',
        textTransform: 'uppercase'
    },
    subtitle: {
        color: '#000',
        fontFamily: 'Roboto-Medium',
        fontSize: '10@vs',
    },
    btn: {
        backgroundColor: '#008b8b',
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
