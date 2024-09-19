import React from 'react';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';

import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  )
}

export default App;
