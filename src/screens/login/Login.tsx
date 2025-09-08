import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/Color';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';

export default function Login() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
          Login
        </Text>
        <View style={{ width: normalize(20) }}></View>
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
            style={{
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              fontSize: normalize(20),
            }}
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

        {/* Lupa Password */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: normalize(10),
          }}
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
