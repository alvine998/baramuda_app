import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const TAX_TYPES = [
  { id: 'pbb', label: 'PBB (Pajak Bumi Bangunan)' },
  { id: 'pkb', label: 'PKB (Pajak Kendaraan Bermotor)' },
  { id: 'reklame', label: 'Pajak Reklame' },
  { id: 'hotel', label: 'Pajak Hotel / Restoran' },
];

const REGIONS = ['Kab. Bandung', 'Kota Depok', 'DKI Jakarta', 'Kab. Sleman', 'Kota Surabaya'];

export default function PajakDaerah({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [selectedTax, setSelectedTax] = React.useState<typeof TAX_TYPES[0] | null>(TAX_TYPES[0]);
  const [selectedRegion, setSelectedRegion] = React.useState<string>(REGIONS[0]);
  const [referenceNumber, setReferenceNumber] = React.useState('');
  const [nominal, setNominal] = React.useState('Rp850.000');

  const infoReady = referenceNumber.length >= 6 && !!selectedTax && !!selectedRegion;

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
            Pajak Daerah
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Bayar berbagai jenis pajak daerah Anda tanpa perlu datang ke kantor pajak.
          </Text>
        </View>

        {/* Tax Type */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Jenis Pajak
          </Text>
          {TAX_TYPES.map((tax) => {
            const selected = selectedTax?.id === tax.id;
            return (
              <TouchableOpacity
                key={tax.id}
                activeOpacity={0.9}
                onPress={() => setSelectedTax(tax)}
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
                    {tax.label}
                  </Text>
                  <Icon name="check-circle" size={normalize(16)} color={selected ? COLOR.SECONDARY : 'transparent'} solid />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Region */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Wilayah
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.SECONDARY,
              borderRadius: normalize(16),
              paddingVertical: normalize(14),
              paddingHorizontal: normalize(18),
              backgroundColor: COLOR.WHITE,
            }}
          >
            <TextInput
              placeholder="Pilih wilayah"
              placeholderTextColor={COLOR.GRAY}
              value={selectedRegion}
              onChangeText={setSelectedRegion}
              style={{ fontSize: normalize(16), color: COLOR.PRIMARY }}
            />
          </View>
        </View>

        {/* Reference Number */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Referensi Pajak
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
            <Icon name="file-alt" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 3210XXXXXX"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="default"
              value={referenceNumber}
              onChangeText={setReferenceNumber}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
              autoCapitalize="characters"
            />
            {referenceNumber.length > 0 && (
              <TouchableOpacity onPress={() => setReferenceNumber('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Nomor referensi dapat ditemukan pada surat ketetapan pajak atau e-billing.
          </Text>
        </View>

        {/* Nominal */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Jumlah Pajak
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.SECONDARY,
              borderRadius: normalize(16),
              paddingVertical: normalize(14),
              paddingHorizontal: normalize(18),
              backgroundColor: COLOR.WHITE,
            }}
          >
            <TextInput
              placeholder="Masukkan nominal"
              placeholderTextColor={COLOR.GRAY}
              value={nominal}
              onChangeText={setNominal}
              style={{ fontSize: normalize(16), color: COLOR.PRIMARY }}
            />
          </View>
        </View>

        {/* Summary */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(20) }}>
          <View
            style={{
              backgroundColor: COLOR.SECONDARY,
              borderRadius: normalize(20),
              padding: normalize(18),
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Jenis Pajak</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedTax ? selectedTax.label : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Wilayah</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>{selectedRegion || '-'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>No. Referensi</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {referenceNumber.length ? referenceNumber : '-'}
              </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#e3d7c4', marginVertical: normalize(8) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? nominal : 'Rp0'}
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
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Bayar Pajak</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Sistem akan meneruskan pembayaran ke dinas pajak daerah. Simpan bukti pembayaran sebagai arsip.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


