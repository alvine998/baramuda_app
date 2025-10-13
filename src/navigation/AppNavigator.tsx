import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import Prelogin from '../screens/prelogin/Prelogin';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import NewsDetail from '../screens/home/NewsDetail';
import ProductDetail from '../screens/mart/ProductDetail';
import Media from '../screens/media/Media';
import AboutUs from '../screens/about_us/AboutUs';
import Profile from '../screens/profile/Profile';
import Notification from '../screens/notification/Notification';
import NotificationDetail from '../screens/notification/NotificationDetail';

// Import Bottom Tab Navigator
import BottomTabNavigator from './BottomTabNavigator';

// Define navigation types
export type RootStackParamList = {
  Prelogin: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainApp: undefined;
  NewsDetail: { newsId?: number; newsTitle?: string; newsContent?: string; newsImage?: string };
  ProductDetail: { productId?: number; productName?: string; productPrice?: number; productImage?: string };
  Media: undefined;
  AboutUs: undefined;
  Profile: undefined;
  Notification: undefined;
  NotificationDetail: { notificationId?: number; title?: string; content?: string };
};

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Prelogin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Prelogin" component={Prelogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Media" component={Media} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
