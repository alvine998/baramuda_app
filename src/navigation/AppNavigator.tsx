import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import Toast from 'react-native-toast-message';

// Import screens
import Prelogin from '../screens/prelogin/Prelogin';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import Home from '../screens/home/Home';
import NewsDetail from '../screens/home/NewsDetail';
import Mart from '../screens/mart/Mart';
import ProductDetail from '../screens/mart/ProductDetail';
import Media from '../screens/media/Media';
import AboutUs from '../screens/about_us/AboutUs';
import Profile from '../screens/profile/Profile';
import Notification from '../screens/notification/Notification';
import NotificationDetail from '../screens/notification/NotificationDetail';

// Define navigation types
export type RootStackParamList = {
  Prelogin: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  MainApp: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Prelogin: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewsDetail: undefined;
  Mart: undefined;
  ProductDetail: undefined;
  Media: undefined;
  AboutUs: undefined;
  Profile: undefined;
  Notification: undefined;
  NotificationDetail: undefined;
};

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom Drawer Content
function CustomDrawerContent({ navigation }: { navigation: any }) {
  const handleProfilePress = () => {
    navigation.closeDrawer();
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    navigation.closeDrawer();
    navigation.navigate('Notification');
  };

  const handleMartPress = () => {
    navigation.closeDrawer();
    navigation.navigate('Mart');
  };

  const handleMediaPress = () => {
    navigation.closeDrawer();
    navigation.navigate('Media');
  };

  const handleAboutUsPress = () => {
    navigation.closeDrawer();
    navigation.navigate('AboutUs');
  };

  const handleSettingsPress = () => {
    navigation.closeDrawer();
    // Show coming soon message for settings
    Toast.show({
      type: 'info',
      text1: 'Pengaturan',
      text2: 'Fitur pengaturan akan segera hadir',
      position: 'top',
    });
  };

  const handleHelpPress = () => {
    navigation.closeDrawer();
    // Show coming soon message for help
    Toast.show({
      type: 'info',
      text1: 'Bantuan',
      text2: 'Fitur bantuan akan segera hadir',
      position: 'top',
    });
  };

  const handleLogout = () => {
    navigation.closeDrawer();
    // Navigate back to Prelogin
    navigation.reset({
      index: 0,
      routes: [{ name: 'Prelogin' }],
    });
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ padding: 20, marginBottom: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
          Menu
        </Text>
      </View>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleProfilePress}
      >
        <FontAwesome5 name="user" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleNotificationPress}
      >
        <FontAwesome5 name="bell" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Notifikasi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleMartPress}
      >
        <FontAwesome5 name="shopping-cart" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Mart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleMediaPress}
      >
        <FontAwesome5 name="play-circle" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Media</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleAboutUsPress}
      >
        <FontAwesome5 name="info-circle" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Tentang Kami</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleSettingsPress}
      >
        <FontAwesome5 name="cog" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Pengaturan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 10 }}
        onPress={handleHelpPress}
      >
        <FontAwesome5 name="question-circle" size={20} color="#333" style={{ marginRight: 15 }} iconStyle="solid" />
        <Text style={{ fontSize: 16, color: '#333' }}>Bantuan</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 30 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF4444',
            marginHorizontal: 20,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center'
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Keluar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main Drawer Navigator
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: '75%',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Prelogin" component={Prelogin} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
      <Drawer.Screen name="NewsDetail" component={NewsDetail} />
      <Drawer.Screen name="Mart" component={Mart} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
      <Drawer.Screen name="Media" component={Media} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="NotificationDetail" component={NotificationDetail} />
    </Drawer.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
