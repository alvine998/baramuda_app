import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

interface RegisterProps {
  navigation: any;
}

export default function Register({ navigation }: RegisterProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisible2, setIsVisible2] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const formValidation = () => {
    if (
      payload.name === '' ||
      payload.email === '' ||
      payload.phone === '' ||
      payload.password === '' ||
      payload.confirmPassword === ''
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Semua field harus diisi',
        position: 'top',
      });
    }
    if (!payload.email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Format email tidak valid',
        position: 'top',
      });
      return;
    }
    if (payload.phone.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Nomor telepon minimal 10 digit',
        position: 'top',
      });
      return;
    }
    if (payload.password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password minimal 8 karakter',
        position: 'top',
      });
      return;
    }
    if (payload.password !== payload.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Konfirmasi password tidak sama',
        position: 'top',
      });
      return;
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      const isValid = formValidation();
      if (!isValid) return;
      
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log(payload);
        Toast.show({
          type: 'success',
          text1: 'Registrasi Berhasil',
          text2: 'Akun Anda telah dibuat',
          position: 'top',
        });
        // Navigate to Login after successful registration
        navigation.navigate('Login');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Registrasi gagal, coba lagi',
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
            Daftar
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
          {/* Full Name Input */}
          <View style={{ marginBottom: normalize(20) }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: '#333',
                marginBottom: normalize(8),
              }}
            >
              Nama Lengkap
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
                name="user"
                size={normalize(16)}
                color="#666"
                solid
                style={{ marginRight: normalize(12) }}
              />
              <TextInput
                placeholder="Masukkan nama lengkap Anda"
                placeholderTextColor="#999"
                value={payload?.name}
                onChangeText={value => setPayload({ ...payload, name: value })}
                style={{
                  flex: 1,
                  fontSize: normalize(16),
                  color: '#333',
                  paddingVertical: normalize(16),
                }}
              />
            </View>
          </View>

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
                value={payload?.email}
                onChangeText={value => setPayload({ ...payload, email: value })}
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

          {/* Phone Input */}
          <View style={{ marginBottom: normalize(20) }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: '#333',
                marginBottom: normalize(8),
              }}
            >
              Nomor Telepon
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
                name="phone"
                size={normalize(16)}
                color="#666"
                solid
                style={{ marginRight: normalize(12) }}
              />
              <TextInput
                placeholder="Masukkan nomor telepon"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLength={13}
                value={payload?.phone}
                onChangeText={value => setPayload({ ...payload, phone: value })}
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
                placeholder="Masukkan password"
                placeholderTextColor="#999"
                secureTextEntry={!isVisible}
                value={payload?.password}
                onChangeText={value => setPayload({ ...payload, password: value })}
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

          {/* Confirm Password Input */}
          <View style={{ marginBottom: normalize(30) }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: '#333',
                marginBottom: normalize(8),
              }}
            >
              Konfirmasi Password
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
                placeholder="Konfirmasi password Anda"
                placeholderTextColor="#999"
                secureTextEntry={!isVisible2}
                value={payload?.confirmPassword}
                onChangeText={value =>
                  setPayload({ ...payload, confirmPassword: value })
                }
                style={{
                  flex: 1,
                  fontSize: normalize(16),
                  color: '#333',
                  paddingVertical: normalize(16),
                }}
              />
              <TouchableOpacity
                onPress={() => setIsVisible2(!isVisible2)}
                style={{ padding: normalize(4) }}
              >
                <Icon
                  name={isVisible2 ? 'eye' : 'eye-slash'}
                  size={normalize(16)}
                  color="#666"
                  solid
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
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
            onPress={onSubmit}
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
                {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
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
            Sudah punya akun?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '600',
                    color: COLOR.PRIMARY,
                  }}
                >
                  Masuk Sekarang
                </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
