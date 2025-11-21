import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../utils/Color';
import normalize from 'react-native-normalize';

// Import screens
import Home from '../screens/home/Home';
import Mart from '../screens/mart/Mart';
import Interaksi from '../screens/interaksi/Interaksi';
import Akun from '../screens/akun/Akun';
import InteractionMenu from '../screens/interaction/InteractionMenu';

// Define tab param list
export type BottomTabParamList = {
  Beranda: undefined;
  Mart: undefined;
  Interaksi: undefined;
  Akun: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  // Additional padding for Samsung devices and devices with gesture navigation
  const getBottomPadding = () => {
    if (Platform.OS === 'android') {
      // For Android devices, especially Samsung Galaxy Z Fold
      return Math.max(insets.bottom, normalize(16));
    }
    return insets.bottom;
  };
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Beranda') {
            iconName = 'home';
          } else if (route.name === 'Mart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Interaksi') {
            iconName = 'comments';
          } else if (route.name === 'Akun') {
            iconName = 'user';
          } else {
            iconName = 'circle';
          }

          return (
            <Icon
              name={iconName as any}
              size={focused ? normalize(22) : normalize(20)}
              color={color}
              solid
            />
          );
        },
        tabBarActiveTintColor: COLOR.PRIMARY,
        tabBarInactiveTintColor: COLOR.GRAY,
        tabBarStyle: {
          backgroundColor: COLOR.WHITE,
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          paddingTop: normalize(8),
          paddingBottom: getBottomPadding(),
          height: normalize(70) + getBottomPadding(),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: normalize(12),
          fontWeight: '600',
          marginTop: normalize(4),
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
        }}
      />
      <Tab.Screen
        name="Mart"
        component={Mart}
        options={{
          tabBarLabel: 'Mart',
        }}
      />
      <Tab.Screen
        name="Interaksi"
        component={InteractionMenu}
        options={{
          tabBarLabel: 'Interaksi',
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Akun}
        options={{
          tabBarLabel: 'Akun',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
