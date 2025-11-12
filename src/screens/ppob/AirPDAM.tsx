import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface RegionOption {
  id: string;
  label: string;
  adminFee: string;
}

const REGIONS: RegionOption[] = [
  { id: 'jakbar', label: 'PDAM Jakarta Barat', adminFee: 'Biaya admin Rp2.500' },
  { id: 'jakpus', label: 'PDAM Jakarta Pusat', adminFee: 'Biaya admin Rp2.500' },
  { id: 'depok', label: 'PDAM Tirta Asasta Depok', adminFee: 'Biaya admin Rp3.000' },
  { id: 'bandung', label: 'PDAM Tirtawening Bandung', adminFee: 'Biaya admin Rp3.000' },
  { id: 'surabaya', label: 'PDAM Surya Sembada Surabaya', adminFee: 'Biaya admin Rp3.500' },
];

const BILL_PREVIEW = [
  { id: 'tagihan', label: 'Tagihan Bulan Ini', value: 'Rp125.400' },
  { id: 'denda', label: 'Denda', value: 'Rp0' },
  { id: 'admin', label: 'Biaya Admin', value: 'Rp2.500' },
];

export default function AirPDAM({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [customerNumber, setCustomerNumber] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState<RegionOption | null>(null);
  const [customerName, setCustomerName] = React.useState('Nama Pelanggan');

  const infoReady = customerNumber.length >= 6 && !!selectedRegion;

  const totalPayment = infoReady
    ? 'Rp' +
      (
        125400 +
        (selectedRegion?.id === 'depok' || selectedRegion?.id === 'bandung' ? 3000 : selectedRegion?.id === 'surabaya' ? 3500 : 2500)
      ).toLocaleString('id-ID')
    : 'Rp0';

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
            Air PDAM
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Bayar tagihan air PDAM dari berbagai daerah dengan aman dan praktis.
          </Text>
        </View>

        {/* Customer Number */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Pelanggan
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
            <Icon name="tint" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 1234567"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="number-pad"
              value={customerNumber}
              onChangeText={setCustomerNumber}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
              maxLength={12}
            />
            {customerNumber.length > 0 && (
              <TouchableOpacity onPress={() => setCustomerNumber('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Nomor pelanggan dapat dilihat pada rekening tagihan air PDAM Anda.
          </Text>
        </View>

        {/* Region Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(28) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Wilayah PDAM
          </Text>

          {REGIONS.map((region) => {
            const selected = selectedRegion?.id === region.id;
            return (
              <TouchableOpacity
                key={region.id}
                activeOpacity={0.9}
                onPress={() => setSelectedRegion(region)}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(6) }}>
                  <Text
                    style={{
                      fontSize: normalize(15),
                      fontWeight: '700',
                      color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                    }}
                  >
                    {region.label}
                  </Text>
                  <Icon name="check-circle" size={normalize(16)} color={selected ? COLOR.SECONDARY : 'transparent'} solid />
                </View>
                <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>{region.adminFee}</Text>
              </TouchableOpacity>
            );
          })}
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
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor Pelanggan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {customerNumber.length ? customerNumber : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nama Pelanggan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? customerName : '-'}
              </Text>
            </View>
            {BILL_PREVIEW.map((row) => (
              <View key={row.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(6) }}>
                <Text style={{ fontSize: normalize(13), color: COLOR.PRIMARY }}>{row.label}</Text>
                <Text style={{ fontSize: normalize(13), color: COLOR.PRIMARY, fontWeight: row.id === 'tagihan' ? '700' : '600' }}>
                  {row.value}
                </Text>
              </View>
            ))}
            <View style={{ height: 1, backgroundColor: '#e3d7c4', marginVertical: normalize(8) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>{totalPayment}</Text>
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
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Bayar Sekarang</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Bukti pembayaran akan dikirim ke email Anda dan tagihan PDAM akan otomatis diperbarui setelah pembayaran sukses.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


