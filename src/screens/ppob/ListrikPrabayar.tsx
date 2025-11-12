import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface TokenPackage {
  id: string;
  label: string;
  tokenValue: string;
  price: string;
}

const TOKEN_OPTIONS: TokenPackage[] = [
  { id: 't-20', label: 'Token 20K', tokenValue: 'Rp20.000', price: 'Rp22.500' },
  { id: 't-50', label: 'Token 50K', tokenValue: 'Rp50.000', price: 'Rp52.500' },
  { id: 't-100', label: 'Token 100K', tokenValue: 'Rp100.000', price: 'Rp102.500' },
  { id: 't-200', label: 'Token 200K', tokenValue: 'Rp200.000', price: 'Rp202.500' },
  { id: 't-500', label: 'Token 500K', tokenValue: 'Rp500.000', price: 'Rp502.500' },
  { id: 't-1000', label: 'Token 1.000K', tokenValue: 'Rp1.000.000', price: 'Rp1.002.500' },
];

export default function ListrikPrabayar({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [meterNumber, setMeterNumber] = React.useState('');
  const [customerName, setCustomerName] = React.useState('Nama Pelanggan');
  const [selectedToken, setSelectedToken] = React.useState<TokenPackage | null>(null);

  const infoReady = meterNumber.length >= 9;

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: normalize(32) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: normalize(20),
            paddingTop: normalize(28),
            paddingBottom: normalize(24),
            backgroundColor: COLOR.SECONDARY,
            borderBottomLeftRadius: normalize(24),
            borderBottomRightRadius: normalize(24),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: normalize(42),
              height: normalize(42),
              borderRadius: normalize(21),
              backgroundColor: COLOR.PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: normalize(20),
            }}
          >
            <Icon name="arrow-left" size={normalize(16)} color={COLOR.SECONDARY} solid />
          </TouchableOpacity>

          <Text style={{ fontSize: normalize(24), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(6) }}>
            Listrik Prabayar
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Isi ulang token listrik prabayar PLN untuk memastikan listrik rumah selalu menyala.
          </Text>
        </View>

        {/* Meter Input */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Meter / ID Pelanggan
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLOR.SECONDARY,
              borderRadius: normalize(16),
              paddingHorizontal: normalize(16),
              paddingVertical: normalize(10),
            }}
          >
            <Icon name="bolt" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 14123456789"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="number-pad"
              value={meterNumber}
              onChangeText={setMeterNumber}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
              maxLength={13}
            />
            {meterNumber.length > 0 && (
              <TouchableOpacity onPress={() => setMeterNumber('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Nomor meter terdiri dari 11-13 digit angka. Pastikan data sesuai dengan rekening listrik Anda.
          </Text>
        </View>

        {/* Token Choices */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(28) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Nominal Token
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {TOKEN_OPTIONS.map((token) => {
              const selected = selectedToken?.id === token.id;
              return (
                <TouchableOpacity
                  key={token.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedToken(token)}
                  style={{
                    width: '47%',
                    borderWidth: 1.5,
                    borderColor: selected ? COLOR.PRIMARY : COLOR.SECONDARY,
                    backgroundColor: selected ? COLOR.PRIMARY : COLOR.WHITE,
                    borderRadius: normalize(18),
                    paddingVertical: normalize(16),
                    paddingHorizontal: normalize(16),
                    marginBottom: normalize(14),
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontWeight: '700',
                      color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                      marginBottom: normalize(4),
                    }}
                  >
                    {token.label}
                  </Text>
                  <Text style={{ fontSize: normalize(12), color: selected ? '#f7ebe2' : COLOR.DARK_GRAY }}>{token.tokenValue}</Text>
                  <Text style={{ fontSize: normalize(12), color: selected ? '#f7ebe2' : COLOR.DARK_GRAY, marginTop: normalize(4) }}>
                    Total: {token.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Summary */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <View
            style={{
              backgroundColor: COLOR.SECONDARY,
              borderRadius: normalize(20),
              padding: normalize(18),
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>No. Meter</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {meterNumber.length ? meterNumber : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nama Pelanggan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? customerName : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nominal</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedToken ? selectedToken.price : 'Rp0'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: infoReady && selectedToken ? COLOR.PRIMARY : COLOR.GRAY,
              paddingVertical: normalize(16),
              borderRadius: normalize(20),
              alignItems: 'center',
            }}
            disabled={!infoReady || !selectedToken}
          >
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Lanjutkan Pembayaran</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Token akan dikirim melalui SMS ke nomor meter terdaftar dan email Anda setelah pembayaran berhasil.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


