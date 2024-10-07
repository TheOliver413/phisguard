import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters'
import { windowWidth } from '../utils/Dimensions';

export default function ListItem({ photo, title, subtitle, isFree, price, onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <Image source={photo} style={styles.img} />
                <View style={styles.texts}>
                    <Text
                        numberOfLines={2}
                        style={styles.itemName}
                    >
                        {title}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={styles.subtitle}
                    >
                        {subtitle}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <Text style={styles.btnText}>
                    {isFree === 'Yes' ? 'Play' : price}
                </Text>
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
