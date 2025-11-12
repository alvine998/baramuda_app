import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface DataPackage {
  id: string;
  label: string;
  quota: string;
  validity: string;
  price: string;
}

const DATA_PACKAGES: DataPackage[] = [
  { id: 'd-3gb', label: 'Data 3 GB', quota: '3 GB', validity: 'Aktif 7 hari', price: 'Rp25.000' },
  { id: 'd-5gb', label: 'Data 5 GB', quota: '5 GB', validity: 'Aktif 15 hari', price: 'Rp35.000' },
  { id: 'd-10gb', label: 'Data 10 GB', quota: '10 GB', validity: 'Aktif 30 hari', price: 'Rp55.000' },
  { id: 'd-15gb', label: 'Data 15 GB', quota: '15 GB', validity: 'Aktif 30 hari', price: 'Rp75.000' },
  { id: 'd-25gb', label: 'Data 25 GB', quota: '25 GB', validity: 'Aktif 60 hari', price: 'Rp110.000' },
  { id: 'd-unlimited', label: 'Unlimited Harian', quota: 'FUP 1.5 GB/hari', validity: 'Aktif 30 hari', price: 'Rp120.000' },
];

interface PaketDataProps {
  navigation: any;
}

export default function PaketData({ navigation }: PaketDataProps) {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedPackage, setSelectedPackage] = React.useState<DataPackage | null>(null);

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
            Paket Data
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Pilih paket data terbaik dari berbagai operator dengan harga terjangkau.
          </Text>
        </View>

        {/* Phone Input */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Handphone
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
            <Icon name="wifi" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
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
            Nomor harus aktif dan sesuai operator paket data yang dipilih.
          </Text>
        </View>

        {/* Package Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(28) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Paket Data
          </Text>

          <View>
            {DATA_PACKAGES.map((pkg) => {
              const selected = selectedPackage?.id === pkg.id;
              return (
                <TouchableOpacity
                  key={pkg.id}
                  onPress={() => setSelectedPackage(pkg)}
                  activeOpacity={0.9}
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
                    <Text
                      style={{
                        fontSize: normalize(15),
                        fontWeight: '700',
                        color: selected ? COLOR.SECONDARY : COLOR.PRIMARY,
                      }}
                    >
                      {pkg.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        fontWeight: '700',
                        color: selected ? '#f7ebe2' : COLOR.PRIMARY,
                      }}
                    >
                      {pkg.price}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>
                      Kuota: {pkg.quota}
                    </Text>
                    <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>
                      {pkg.validity}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Summary & CTA */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <View
            style={{
              backgroundColor: COLOR.SECONDARY,
              borderRadius: normalize(20),
              padding: normalize(18),
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor Tujuan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {phoneNumber.length > 0 ? phoneNumber : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Paket</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedPackage ? selectedPackage.label : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedPackage ? selectedPackage.price : 'Rp0'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: selectedPackage && phoneNumber.length >= 8 ? COLOR.PRIMARY : COLOR.GRAY,
              paddingVertical: normalize(16),
              borderRadius: normalize(20),
              alignItems: 'center',
            }}
            disabled={!selectedPackage || phoneNumber.length < 8}
          >
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Lanjutkan Pembayaran</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Setelah transaksi berhasil, paket akan otomatis aktif dan notifikasi akan dikirim melalui email.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


