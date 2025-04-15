import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  StatusBar,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

// Theme colors for light and dark mode
const theme = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    secondaryText: '#666666',
    border: '#DDDDDD',
    primary: '#018b8b',
    inputBackground: '#F5F5F5',
    statusBar: 'dark-content',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    secondaryText: '#AAAAAA',
    border: '#444444',
    primary: '#02BEBE',
    inputBackground: '#2A2A2A',
    statusBar: 'light-content',
  }
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const colorScheme = useColorScheme();
  
  // Default to light if colorScheme is null
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  const { login } = useContext(AuthContext);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar barStyle={currentTheme.statusBar} backgroundColor={currentTheme.background} />
      
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <LoginSVG
            height={300}
            width={300}
            style={styles.logo}
          />
        </View>

        <Text
          style={[
            styles.title,
            { color: currentTheme.text }
          ]}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={currentTheme.secondaryText}
              style={styles.inputIcon}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          // Pass theme colors to InputField
          themeColors={{
            text: currentTheme.text,
            background: currentTheme.inputBackground,
            border: currentTheme.border,
            placeholder: currentTheme.secondaryText
          }}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={currentTheme.secondaryText}
              style={styles.inputIcon}
            />
          }
          inputType="password"
          value={password}
          onChangeText={text => setPassword(text)}
          // Pass theme colors to InputField
          themeColors={{
            text: currentTheme.text,
            background: currentTheme.inputBackground,
            border: currentTheme.border,
            placeholder: currentTheme.secondaryText
          }}
        />

        <CustomButton 
          label={"Login"} 
          onPress={() => { login(email, password) }}
          // Pass theme colors to CustomButton
          themeColors={{
            background: currentTheme.primary,
            text: '#FFFFFF'
          }}
        />

        <View style={styles.registerContainer}>
          <Text style={{ color: currentTheme.secondaryText }}>
            New to the app?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerText, { color: currentTheme.primary }]}>
              {' Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    transform: [{ rotate: '-5deg' }]
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 30,
  },
  inputIcon: {
    marginRight: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  registerText: {
    fontWeight: '700',
  },
});

export default LoginScreen;