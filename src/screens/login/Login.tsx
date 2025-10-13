import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }: { navigation: any }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    
    // Simulate API call
    setTimeout(() => {
      // Check if email and password match the required credentials
      if (email === 'admin@gmail.com' && password === 'admin1234') {
        Toast.show({
          type: 'success',
          text1: 'Login Berhasil',
          text2: 'Selamat datang kembali!',
        });
        // Navigate to MainApp after successful login
        navigation.navigate('MainApp');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Gagal',
          text2: 'Email atau password salah',
        });
      }
      setIsLoading(false);
    }, 1500);
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
        contentContainerStyle={{ paddingBottom: normalize(30), marginTop: normalize(40) }}
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
