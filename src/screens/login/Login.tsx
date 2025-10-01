import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import Toast from 'react-native-toast-message';

export default function Login({ navigation }: { navigation: any }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Check if email and password match the required credentials
    if (email === 'admin@gmail.com' && password === 'admin1234') {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      // Navigate to Home screen after successful login
      navigation.navigate('MainApp');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid email or password',
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: normalize(20),
        backgroundColor: COLOR.SECONDARY,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: normalize(20),
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            iconStyle="solid"
            name="chevron-left"
            size={normalize(20)}
            color={COLOR.PRIMARY}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: normalize(20),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
          }}
        >
          Login
        </Text>
        <View style={{ width: normalize(20) }} />
      </View>

      {/* Logo */}
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: normalize(200),
            height: normalize(200),
            marginTop: normalize(40),
          }}
        />
      </View>

      {/* Form */}
      <View style={{ marginTop: normalize(40) }}>
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(10),
            marginTop: normalize(10),
            paddingHorizontal: normalize(10),
            paddingLeft: normalize(20),
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLOR.GRAY}
            value={email}
            onChangeText={setEmail}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(10),
            marginTop: normalize(10),
            paddingHorizontal: normalize(10),
            paddingLeft: normalize(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={isVisible ? false : true}
            placeholderTextColor={COLOR.GRAY}
            value={password}
            onChangeText={setPassword}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
          />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <FontAwesome5
              name={isVisible ? 'eye' : 'eye-slash'}
              size={normalize(20)}
              color={COLOR.GRAY}
            />
          </TouchableOpacity>
        </View>

        {/* Lupa Password */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: normalize(10),
          }}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text
            style={{
              fontSize: normalize(15),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              paddingRight: normalize(10),
            }}
          >
            Lupa Password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLOR.WHITE,
          padding: normalize(20),
          borderRadius: normalize(10),
          marginTop: normalize(40),
          width: '100%',
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            color: COLOR.BLACK,
            fontSize: normalize(16),
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Masuk
        </Text>
      </TouchableOpacity>
    </View>
  );
}
