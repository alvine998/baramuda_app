import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const EMONEY_OPTIONS = [
  { id: 'gopay', label: 'GoPay', color: '#1A73E8' },
  { id: 'ovo', label: 'OVO', color: '#5E2E91' },
  { id: 'dana', label: 'DANA', color: '#1085FF' },
  { id: 'linkaja', label: 'LinkAja', color: '#FF2E2E' },
  { id: 'shopeepay', label: 'ShopeePay', color: '#FF5722' },
];

const NOMINALS = ['Rp20.000', 'Rp50.000', 'Rp100.000', 'Rp200.000', 'Rp500.000'];

export default function TopupEmoney({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [selectedWallet, setSelectedWallet] = React.useState<typeof EMONEY_OPTIONS[0] | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedNominal, setSelectedNominal] = React.useState<string>('');

  const infoReady = !!selectedWallet && phoneNumber.length >= 9 && !!selectedNominal;

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
            Top Up E-Money
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Isi saldo dompet digital favorit Anda dengan cepat dan mudah.
          </Text>
        </View>

        {/* Wallet Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Dompet Digital
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {EMONEY_OPTIONS.map((wallet) => {
              const selected = selectedWallet?.id === wallet.id;
              return (
                <TouchableOpacity
                  key={wallet.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedWallet(wallet)}
                  style={{
                    width: '47%',
                    borderWidth: 1.5,
                    borderColor: selected ? COLOR.PRIMARY : COLOR.SECONDARY,
                    backgroundColor: selected ? COLOR.PRIMARY : COLOR.WHITE,
                    borderRadius: normalize(18),
                    paddingVertical: normalize(16),
                    paddingHorizontal: normalize(18),
                    marginBottom: normalize(14),
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: normalize(36),
                        height: normalize(36),
                        borderRadius: normalize(18),
                        backgroundColor: wallet.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: normalize(12),
                      }}
                    >
                      <Icon name="wallet" size={normalize(16)} color={COLOR.WHITE} solid />
                    </View>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        fontWeight: '700',
                        color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                      }}
                    >
                      {wallet.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Phone Number */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Handphone / Akun
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
            <Icon name="mobile-alt" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 0812 3456 7890"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
            />
            {phoneNumber.length > 0 && (
              <TouchableOpacity onPress={() => setPhoneNumber('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Pastikan nomor sesuai dengan akun dompet digital yang akan diisi saldo.
          </Text>
        </View>

        {/* Nominal Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Nominal
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {NOMINALS.map((nominal) => {
              const selected = selectedNominal === nominal;
              return (
                <TouchableOpacity
                  key={nominal}
                  activeOpacity={0.85}
                  onPress={() => setSelectedNominal(nominal)}
                  style={{
                    width: '30%',
                    borderWidth: 1.5,
                    borderColor: selected ? COLOR.PRIMARY : COLOR.SECONDARY,
                    backgroundColor: selected ? COLOR.PRIMARY : COLOR.WHITE,
                    borderRadius: normalize(18),
                    paddingVertical: normalize(16),
                    marginBottom: normalize(14),
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontWeight: '700',
                      color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                    }}
                  >
                    {nominal}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Dompet Digital</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedWallet ? selectedWallet.label : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor Akun</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {phoneNumber.length ? phoneNumber : '-'}
              </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#e3d7c4', marginVertical: normalize(8) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>Jumlah Top Up</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedNominal || 'Rp0'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: infoReady ? COLOR.PRIMARY : COLOR.GRAY,
              paddingVertical: normalize(16),
              borderRadius: normalize(20),
              alignItems: 'center',
            }}
            disabled={!infoReady}
          >
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Top Up Sekarang</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Saldo akan masuk dalam beberapa detik setelah pembayaran berhasil. Simpan bukti transaksi sebagai referensi.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


