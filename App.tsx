import React from 'react';

import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/Navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}

export default App;
