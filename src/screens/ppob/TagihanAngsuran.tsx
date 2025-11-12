import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const FINANCE_COMPANIES = [
  { id: 'bfi', name: 'BFI Finance', admin: 'Biaya admin Rp5.000' },
  { id: 'astra', name: 'Astra Credit Companies', admin: 'Biaya admin Rp6.500' },
  { id: 'wom', name: 'WOM Finance', admin: 'Biaya admin Rp4.500' },
  { id: 'adira', name: 'Adira Finance', admin: 'Biaya admin Rp6.000' },
];

export default function TagihanAngsuran({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [contractNumber, setContractNumber] = React.useState('');
  const [selectedCompany, setSelectedCompany] = React.useState<typeof FINANCE_COMPANIES[0] | null>(null);
  const [installmentAmount, setInstallmentAmount] = React.useState('Rp1.250.000');
  const [dueDate, setDueDate] = React.useState('10 Maret 2025');

  const infoReady = contractNumber.length >= 8 && !!selectedCompany;

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
            Tagihan Angsuran
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Lunasi angsuran kredit kendaraan atau elektronik Anda secara tepat waktu.
          </Text>
        </View>

        {/* Contract Number */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Kontrak
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
            <Icon name="file-invoice-dollar" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 1200456789"
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
            Nomor kontrak tertera pada surat perjanjian kredit atau aplikasi leasing Anda.
          </Text>
        </View>

        {/* Company Selection */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Pilih Perusahaan Pembiayaan
          </Text>
          {FINANCE_COMPANIES.map((company) => {
            const selected = selectedCompany?.id === company.id;
            return (
              <TouchableOpacity
                key={company.id}
                activeOpacity={0.9}
                onPress={() => setSelectedCompany(company)}
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
                    {company.name}
                  </Text>
                  <Icon name="check-circle" size={normalize(16)} color={selected ? COLOR.SECONDARY : 'transparent'} solid />
                </View>
                <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>{company.admin}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Installment Info */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Jumlah Angsuran
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.SECONDARY,
              borderRadius: normalize(16),
              paddingVertical: normalize(14),
              paddingHorizontal: normalize(18),
              backgroundColor: COLOR.WHITE,
              marginBottom: normalize(16),
            }}
          >
            <TextInput
              placeholder="Masukkan nominal"
              placeholderTextColor={COLOR.GRAY}
              value={installmentAmount}
              onChangeText={setInstallmentAmount}
              style={{ fontSize: normalize(16), color: COLOR.PRIMARY }}
            />
          </View>

          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Jatuh Tempo
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
              placeholder="Tanggal jatuh tempo"
              placeholderTextColor={COLOR.GRAY}
              value={dueDate}
              onChangeText={setDueDate}
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
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor Kontrak</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {contractNumber.length ? contractNumber : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Pembiayaan</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedCompany ? selectedCompany.name : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Jatuh Tempo</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>{dueDate || '-'}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#e3d7c4', marginVertical: normalize(8) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? installmentAmount : 'Rp0'}
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
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Bayar Angsuran</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Pembayaran akan diteruskan ke perusahaan pembiayaan dalam hitungan menit. Simpan bukti pembayaran sebagai arsip.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


