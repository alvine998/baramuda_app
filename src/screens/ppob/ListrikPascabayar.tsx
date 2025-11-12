import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const BILLING_MONTHS = [
  { id: 'jan', label: 'Januari 2025', amount: 'Rp245.000' },
  { id: 'feb', label: 'Februari 2025', amount: 'Rp230.500' },
  { id: 'mar', label: 'Maret 2025', amount: 'Rp252.750' },
];

export default function ListrikPascabayar({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [customerId, setCustomerId] = React.useState('');
  const [customerName, setCustomerName] = React.useState('Nama Pelanggan');
  const [selectedBill, setSelectedBill] = React.useState<typeof BILLING_MONTHS[0] | null>(null);

  const infoReady = customerId.length >= 8;

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
            Listrik Pascabayar
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Bayar tagihan listrik bulanan PLN tepat waktu untuk menghindari denda.
          </Text>
        </View>

        {/* Customer Input */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            ID Pelanggan
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
            <Icon name="file-invoice" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 12345678901"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="number-pad"
              value={customerId}
              onChangeText={setCustomerId}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
              maxLength={12}
            />
            {customerId.length > 0 && (
              <TouchableOpacity onPress={() => setCustomerId('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Masukkan ID pelanggan sesuai pada rekening listrik Anda.
          </Text>
        </View>

        {/* Bill Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(28) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Tagihan yang Akan Dibayar
          </Text>

          <View>
            {BILLING_MONTHS.map((bill) => {
              const selected = selectedBill?.id === bill.id;
              return (
                <TouchableOpacity
                  key={bill.id}
                  activeOpacity={0.9}
                  onPress={() => setSelectedBill(bill)}
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
                      {bill.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        fontWeight: '700',
                        color: selected ? '#f7ebe2' : COLOR.PRIMARY,
                      }}
                    >
                      {bill.amount}
                    </Text>
                  </View>
                  <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>
                    Status: {selected ? 'Siap dibayar' : 'Belum dibayar'}
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
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>ID Pelanggan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {customerId.length ? customerId : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(10) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nama Pelanggan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? customerName : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedBill ? selectedBill.amount : 'Rp0'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: infoReady && selectedBill ? COLOR.PRIMARY : COLOR.GRAY,
              paddingVertical: normalize(16),
              borderRadius: normalize(20),
              alignItems: 'center',
            }}
            disabled={!infoReady || !selectedBill}
          >
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Bayar Sekarang</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Pembayaran berhasil akan langsung diteruskan ke PLN. Simpan bukti pembayaran sebagai arsip Anda.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


