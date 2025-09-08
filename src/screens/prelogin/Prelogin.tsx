import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLOR } from '../../utils/Color';
import normalize from 'react-native-normalize';

export default function Prelogin() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: normalize(20), fontWeight: 'bold' }}>
        Selamat Datang Di
      </Text>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: normalize(200),
          height: normalize(200),
          marginTop: normalize(40),
        }}
      />
      <View style={{ padding: normalize(20), width: '100%' }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            padding: normalize(20),
            borderRadius: normalize(10),
            marginTop: normalize(40),
            width: '100%',
          }}
        >
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: normalize(16),
              textAlign: 'center',
            }}
          >
            Masuk
          </Text>
        </TouchableOpacity>

        {/* Atau */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: normalize(20),
          }}
        >
          <View style={{ height: 1, backgroundColor: COLOR.BLACK, flex: 1 }} />
          <Text
            style={{ marginHorizontal: normalize(10), fontSize: normalize(16) }}
          >
            Atau
          </Text>
          <View style={{ height: 1, backgroundColor: COLOR.BLACK, flex: 1 }} />
        </View>

        {/* Regist */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.PRIMARY,
            padding: normalize(20),
            borderRadius: normalize(10),
            marginTop: normalize(20),
            width: '100%',
          }}
        >
          <Text
            style={{
              color: COLOR.WHITE,
              fontSize: normalize(16),
              textAlign: 'center',
            }}
          >
            Registrasi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
