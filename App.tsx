import { View, Text } from 'react-native';
import React from 'react';
import Prelogin from './src/screens/prelogin/Prelogin';
import Login from './src/screens/login/Login';
import ForgotPassword from './src/screens/forgot-password/ForgotPassword';
import Register from './src/screens/register/Register';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <Register />
      <Toast />
    </>
  );
}
