import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Security from './src/assets/images/svg/securityOn.svg';
// import Security from './src/assets/images/svg/two_factor.svg';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>PHISH GUARD</Text>
      </View>
      <View style={styles.container_img}>
        <Security width={scale(300)} height={verticalScale(250)} />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btn_label}>
          Let's begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={20} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: '30@vs',
    fontWeight: 'bold',
    color: '#2f2e41',
    marginTop: '20@vs'
  },
  btn: {
    backgroundColor: '#e90053',
    padding: '15@vs',
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20@vs'
  },
  btn_label: {
    fontSize: '15@vs',
    color: '#FFF',
    fontFamily: 'Roboto-BlackItalic',
  },
  container_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
