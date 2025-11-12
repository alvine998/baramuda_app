import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface InternetProvider {
  id: string;
  name: string;
  contact: string;
}

const PROVIDERS: InternetProvider[] = [
  { id: 'iconnet', name: 'Iconnet PLN', contact: 'cs@iconnet.id' },
  { id: 'biznet', name: 'Biznet Home', contact: '1500 933' },
  { id: 'myrepublic', name: 'MyRepublic', contact: '1500 818' },
  { id: 'indihome', name: 'IndiHome', contact: '147' },
];

export default function Internet({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [selectedProvider, setSelectedProvider] = React.useState<InternetProvider | null>(null);
  const [contractNumber, setContractNumber] = React.useState('');
  const [note, setNote] = React.useState('');

  const infoReady = !!selectedProvider && contractNumber.length >= 6;

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
            Internet Rumah
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Pilih provider dan paket internet sesuai kebutuhan rumah Anda.
          </Text>
        </View>

        {/* Provider Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Provider
          </Text>

          {PROVIDERS.map((provider) => {
            const selected = selectedProvider?.id === provider.id;
            return (
              <TouchableOpacity
                key={provider.id}
                activeOpacity={0.9}
                onPress={() => setSelectedProvider(provider)}
                style={{
                  borderWidth: 1.5,
                  borderColor: selected ? COLOR.PRIMARY : COLOR.SECONDARY,
                  backgroundColor: selected ? COLOR.PRIMARY : COLOR.WHITE,
                  borderRadius: normalize(18),
                  paddingVertical: normalize(16),
                  paddingHorizontal: normalize(18),
                  marginBottom: normalize(14),
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: normalize(15),
                      fontWeight: '700',
                      color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                    }}
                  >
                    {provider.name}
                  </Text>
                  <Icon name="check-circle" size={normalize(16)} color={selected ? COLOR.SECONDARY : 'transparent'} solid />
                </View>
                <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY, marginTop: normalize(6) }}>
                  Kontak layanan: {provider.contact}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contract Number */}
        {selectedProvider && (
          <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
            <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
              Nomor Kontrak / ID Pelanggan
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
              <Icon name="file-contract" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
              <TextInput
                placeholder="Masukkan nomor pelanggan internet"
                placeholderTextColor={COLOR.GRAY}
                keyboardType="default"
                value={contractNumber}
                onChangeText={setContractNumber}
                style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
                autoCapitalize="characters"
              />
              {contractNumber.length > 0 && (
                <TouchableOpacity onPress={() => setContractNumber('')}>
                  <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
                </TouchableOpacity>
              )}
            </View>
            <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
              Nomor pelanggan digunakan untuk memverifikasi langganan internet Anda.
            </Text>
          </View>
        )}

        {/* Optional Note */}
        {selectedProvider && (
          <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(16) }}>
            <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
              Catatan Tambahan (Opsional)
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLOR.SECONDARY,
                borderRadius: normalize(16),
                paddingHorizontal: normalize(16),
                paddingVertical: normalize(12),
              }}
            >
              <TextInput
                placeholder="Contoh: Paket 30 Mbps, pemasangan ulang, dsb."
                placeholderTextColor={COLOR.GRAY}
                value={note}
                onChangeText={setNote}
                style={{ fontSize: normalize(14), color: COLOR.PRIMARY }}
                multiline
              />
            </View>
          </View>
        )}

        {/* Summary */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(20) }}>
          <View
            style={{
              backgroundColor: COLOR.SECONDARY,
              borderRadius: normalize(20),
              padding: normalize(18),
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Provider</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedProvider ? selectedProvider.name : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor Kontrak</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedProvider ? (contractNumber.length ? contractNumber : '-') : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Catatan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', flex: 1, textAlign: 'right', marginLeft: normalize(12) }}>
                {note.length ? note : '-'}
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
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Lanjutkan Pemasangan</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Tim provider akan menghubungi Anda untuk konfirmasi jadwal pemasangan setelah pembayaran berhasil.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


