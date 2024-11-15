import React from 'react'
import Security from '../assets/images/svg/secutiry.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Button, SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

const OnBoardingScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>PHISH GUARD</Text>
            </View>
            <View style={styles.container_img}>
                <Security width={scale(300)} height={verticalScale(300)} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btn_label}>
                    Phishing Guard
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
      color: '#FFF',
      marginTop: '20@vs',
    },
    btn: {
      backgroundColor: '#008b8b',
      padding: '15@vs',
      width: '90%',
      borderRadius: '5@ms',
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
    },
    homeScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default OnBoardingScreen