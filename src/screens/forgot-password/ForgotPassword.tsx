import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';

export default function ForgotPassword() {
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
        <FontAwesome5
          iconStyle="solid"
          name="chevron-left"
          size={normalize(20)}
          color={COLOR.PRIMARY}
        />
        <Text
          style={{
            fontSize: normalize(20),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
          }}
        >
          Lupa Password
        </Text>
        <View style={{ width: normalize(20) }}></View>
      </View>

      <View style={{ marginTop: normalize(20) }}>
        <Text style={{ fontSize: normalize(16), textAlign: 'justify' }}>
          Masukkan alamat email anda untuk mendapatkan kode OTP dan melakukan
          reset password
        </Text>
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
            placeholder="Email"
            placeholderTextColor={COLOR.GRAY}
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
          />
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
      >
        <Text
          style={{
            color: COLOR.BLACK,
            fontSize: normalize(16),
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Kirim
        </Text>
      </TouchableOpacity>
    </View>
  );
}
