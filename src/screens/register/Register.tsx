import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import Toast from 'react-native-toast-message';

interface RegisterProps {
  navigation: any;
}

export default function Register({ navigation }: RegisterProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisible2, setIsVisible2] = useState<boolean>(false);
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
        text1: 'Semua Field Harus Diisi',
        position: 'top',
      });
    }
    if (!payload.email.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Email Tidak Valid',
        position: 'top',
      });
      return;
    }
    if (payload.phone.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Nomor Telepon Tidak Valid',
        position: 'top',
      });
      return;
    }
    if (payload.password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Password Minimal 8 Karakter',
        position: 'top',
      });
      return;
    }
    if (payload.password !== payload.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Tidak Sama',
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
      console.log(payload);
      Toast.show({
        type: 'success',
        text1: 'Registrasi Berhasil',
        position: 'top',
      });
      // Navigate to Login after successful registration
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Registrasi Gagal',
        position: 'top',
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
          Registrasi
        </Text>
        <View style={{ width: normalize(20) }} />
      </View>

      {/* Form */}
      <View style={{ marginTop: normalize(20) }}>
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
            placeholder="Nama Lengkap"
            placeholderTextColor={COLOR.GRAY}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
            value={payload?.name}
            onChangeText={value => setPayload({ ...payload, name: value })}
          />
        </View>
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
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
            value={payload?.email}
            onChangeText={value => setPayload({ ...payload, email: value })}
          />
        </View>
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
            placeholder="No Handphone"
            placeholderTextColor={COLOR.GRAY}
            keyboardType="phone-pad"
            maxLength={13}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
            value={payload?.phone}
            onChangeText={value => setPayload({ ...payload, phone: value })}
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
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
            value={payload?.password}
            onChangeText={value => setPayload({ ...payload, password: value })}
          />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <FontAwesome5
              iconStyle="solid"
              name="eye-slash"
              size={normalize(20)}
              color={COLOR.GRAY}
            />
          </TouchableOpacity>
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
            placeholder="Konfirmasi Password"
            secureTextEntry={isVisible2 ? false : true}
            placeholderTextColor={COLOR.GRAY}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
            value={payload?.confirmPassword}
            onChangeText={value =>
              setPayload({ ...payload, confirmPassword: value })
            }
          />
          <TouchableOpacity onPress={() => setIsVisible2(!isVisible2)}>
            <FontAwesome5
              iconStyle="solid"
              name="eye-slash"
              size={normalize(20)}
              color={COLOR.GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLOR.WHITE,
          padding: normalize(20),
          borderRadius: normalize(10),
          marginTop: normalize(20),
          width: '100%',
        }}
        onPress={() => {
          onSubmit();
        }}
      >
        <Text
          style={{
            color: COLOR.BLACK,
            fontSize: normalize(16),
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Daftar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
