import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MessagesScreen</Text>
    </View>
  )
}

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
});

export default MessagesScreen