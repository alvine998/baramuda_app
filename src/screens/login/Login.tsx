import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { CONFIG } from '../../config';
import axios from 'axios';
import { saveAuthData } from '../../services/storage';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }: { navigation: any }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Navigate to Prelogin instead of going back
        navigation.navigate('Prelogin');
        return true; // Prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email dan password harus diisi',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${CONFIG.API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Login successful:', response.data);
      
      // Extract and save auth data from response
      if (response.data && response.data.data) {
        const authData = {
          user: response.data.data.user,
          token: response.data.data.token,
        };
        
        // Save to AsyncStorage
        try {
          await saveAuthData(authData);
          console.log('Auth data saved to AsyncStorage');
        } catch (storageError) {
          console.error('Error saving auth data:', storageError);
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: 'Gagal menyimpan data login',
            position: 'top',
          });
        }
      }
      
      Toast.show({
        type: 'success',
        text1: 'Login Berhasil',
        text2: 'Selamat datang kembali!',
      });
      
      // Navigate to MainApp after successful login
      setIsLoading(false);
      navigation.navigate('MainApp');
    } catch (error: any) {
      console.log('Login error:', error);
      
      // Extract error message from API response
      let errorMessage = 'Login gagal, coba lagi';
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData && errorData.error) {
          errorMessage = errorData.error;
        } else if (status === 400) {
          errorMessage = 'Email atau password tidak valid';
        } else if (status === 401) {
          errorMessage = 'Email atau password salah';
        } else if (status === 404) {
          errorMessage = 'Pengguna tidak ditemukan';
        } else if (status === 500) {
          errorMessage = 'Server error, coba lagi nanti';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Tidak dapat terhubung ke server';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
        position: 'top',
      });
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.SECONDARY} />

      {/* Header with gradient */}
      <View
        style={{
          backgroundColor: COLOR.SECONDARY,
          paddingTop: normalize(50),
          paddingBottom: normalize(0),
          paddingHorizontal: normalize(20),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: normalize(20),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: normalize(40),
              height: normalize(40),
              borderRadius: normalize(20),
              backgroundColor: 'rgba(86, 21, 35, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: normalize(15),
            }}
          >
            <Icon
              solid
              name="chevron-left"
              size={normalize(18)}
              color={COLOR.PRIMARY}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: normalize(24),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
            }}
          >
            Masuk
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: normalize(30),
          marginTop: normalize(40),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Container */}
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            marginHorizontal: normalize(20),
            marginTop: normalize(-20),
            borderRadius: normalize(16),
            padding: normalize(24),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Email Input */}
          <View style={{ marginBottom: normalize(20) }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: '#333',
                marginBottom: normalize(8),
              }}
            >
              Email
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: normalize(12),
                paddingHorizontal: normalize(16),
                borderWidth: 1,
                borderColor: '#e9ecef',
              }}
            >
              <Icon
                name="envelope"
                size={normalize(16)}
                color="#666"
                solid
                style={{ marginRight: normalize(12) }}
              />
              <TextInput
                placeholder="Masukkan email Anda"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  flex: 1,
                  fontSize: normalize(16),
                  color: '#333',
                  paddingVertical: normalize(16),
                }}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: normalize(20) }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: '#333',
                marginBottom: normalize(8),
              }}
            >
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: normalize(12),
                paddingHorizontal: normalize(16),
                borderWidth: 1,
                borderColor: '#e9ecef',
              }}
            >
              <Icon
                name="lock"
                size={normalize(16)}
                color="#666"
                solid
                style={{ marginRight: normalize(12) }}
              />
              <TextInput
                placeholder="Masukkan password Anda"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isVisible}
                style={{
                  flex: 1,
                  fontSize: normalize(16),
                  color: '#333',
                  paddingVertical: normalize(16),
                }}
              />
              <TouchableOpacity
                onPress={() => setIsVisible(!isVisible)}
                style={{ padding: normalize(4) }}
              >
                <Icon
                  name={isVisible ? 'eye' : 'eye-slash'}
                  size={normalize(16)}
                  color="#666"
                  solid
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginBottom: normalize(30),
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: COLOR.PRIMARY,
              }}
            >
              Lupa Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.PRIMARY,
              paddingVertical: normalize(18),
              borderRadius: normalize(12),
              shadowColor: COLOR.PRIMARY,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLoading && (
                <Icon
                  name="spinner"
                  size={normalize(16)}
                  color={COLOR.WHITE}
                  solid
                  style={{ marginRight: normalize(8) }}
                />
              )}
              <Text
                style={{
                  color: COLOR.WHITE,
                  fontSize: normalize(16),
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: normalize(30),
            paddingHorizontal: normalize(20),
          }}
        >
          <Text
            style={{
              fontSize: normalize(14),
              color: '#666',
            }}
          >
            Belum punya akun?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: COLOR.PRIMARY,
              }}
            >
              Daftar Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
