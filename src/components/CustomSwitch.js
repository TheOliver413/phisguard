import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { scale, verticalScale, ScaledSheet } from 'react-native-size-matters'

export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    onSelectSwitch
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    }

    return (
        <View style={styles.customSwitch}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={[
                    styles.btn,
                    { backgroundColor: getSelectionMode === 1 ? '#008b8b' : '#38526d' }
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        { color: getSelectionMode === 1 ? '#FFF' : '#FFF' }
                    ]}
                >
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={[
                    styles.btn,
                    { backgroundColor: getSelectionMode === 2 ? '#008b8b' : '#38526d' }
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        { color: getSelectionMode === 2 ? '#FFF' : '#FFF' }
                    ]}
                >
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = ScaledSheet.create({
    customSwitch: {
        height: '24@vs',
        width: '100%',
        backgroundColor: '#38526d',
        borderRadius: 10,
        borderColor: '#008b8b',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: '14@vs',
        fontFamily: 'Roboto-Medium',
        color: '#FFF'
    }
});
