import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Security from './src/assets/images/svg/secutiry.svg';
import HomeScreen from './src/screens/HomeScreen';

import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Button, SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Main = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>PHISH GUARD</Text>
      </View>
      <View style={styles.container_img}>
        <Security width={scale(300)} height={verticalScale(300)} />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HomeScreen')}>
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

export default App;
