import React from 'react'
import { View, Image } from 'react-native'
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters'

export default function BannerSlider({ data }) {
    return (
        <View style={styles.container}>
            <Image source={data.image} style={styles.image} />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: scale(300),
        height: verticalScale(150),
        borderRadius: 10
    }
});