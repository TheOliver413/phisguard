import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
// import WellDone from './src/assets/images/svg/well_done.svg';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>PHISH GUARD</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btn_label}>
          Let's begin
        </Text>
        {/* <WellDone width={scale(100)} height={verticalScale(100)} /> */}
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
  },
  btn: {
    backgroundColor: '#e90053',
    padding: '15@vs',
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn_label: {
    fontSize: '15@vs',
    color: '#FFF',
    fontFamily: 'Roboto-BlackItalic',
  },
});

export default App;
