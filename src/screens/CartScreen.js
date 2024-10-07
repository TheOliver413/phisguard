import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CartScreen</Text>
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

export default CartScreen