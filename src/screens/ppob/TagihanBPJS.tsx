import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const PARTICIPANT_TYPES = [
  { id: 'mandiri', label: 'Peserta Mandiri', admin: 'Biaya admin Rp2.500' },
  { id: 'pns', label: 'PNS / ASN', admin: 'Biaya admin Rp3.000' },
  { id: 'usaha', label: 'Badah Usaha', admin: 'Biaya admin Rp5.000' },
];

export default function TagihanBPJS({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [participantNumber, setParticipantNumber] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<typeof PARTICIPANT_TYPES[0] | null>(PARTICIPANT_TYPES[0]);
  const [period, setPeriod] = React.useState('Maret 2025');

  const infoReady = participantNumber.length >= 11 && !!selectedType;

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
            Tagihan BPJS
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Bayar iuran BPJS Kesehatan tepat waktu agar perlindungan tetap aktif.
          </Text>
        </View>

        {/* Participant Number */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Nomor Kepesertaan BPJS
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
            <Icon name="id-card" size={normalize(18)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12) }} />
            <TextInput
              placeholder="Contoh: 0001234567890"
              placeholderTextColor={COLOR.GRAY}
              keyboardType="number-pad"
              value={participantNumber}
              onChangeText={setParticipantNumber}
              style={{ flex: 1, fontSize: normalize(16), color: COLOR.PRIMARY }}
              maxLength={13}
            />
            {participantNumber.length > 0 && (
              <TouchableOpacity onPress={() => setParticipantNumber('')}>
                <Icon name="times-circle" size={normalize(18)} color={COLOR.GRAY} solid />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>
            Nomor dapat dilihat pada kartu BPJS Anda atau aplikasi Mobile JKN.
          </Text>
        </View>

        {/* Participant Type */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Jenis Kepesertaan
          </Text>
          {PARTICIPANT_TYPES.map((type) => {
            const selected = selectedType?.id === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                activeOpacity={0.9}
                onPress={() => setSelectedType(type)}
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
                    {type.label}
                  </Text>
                  <Icon name="check-circle" size={normalize(16)} color={selected ? COLOR.SECONDARY : 'transparent'} solid />
                </View>
                <Text style={{ fontSize: normalize(12), color: selected ? '#fbeee2' : COLOR.DARK_GRAY }}>{type.admin}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Billing Period */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(12) }}>
          <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700', marginBottom: normalize(10) }}>
            Periode Pembayaran
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
              placeholder="Bulan & Tahun"
              placeholderTextColor={COLOR.GRAY}
              value={period}
              onChangeText={setPeriod}
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
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Nomor BPJS</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {participantNumber.length ? participantNumber : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Jenis Peserta</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {selectedType ? selectedType.label : '-'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '600' }}>Periode</Text>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>{period || '-'}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#e3d7c4', marginVertical: normalize(8) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: normalize(14), color: COLOR.PRIMARY, fontWeight: '700' }}>Total Bayar</Text>
              <Text style={{ fontSize: normalize(16), color: COLOR.PRIMARY, fontWeight: '700' }}>
                {infoReady ? 'Rp160.500' : 'Rp0'}
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
            <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.SECONDARY }}>Bayar BPJS</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(10), lineHeight: normalize(18) }}>
            Bukti pembayaran akan dikirim ke email Anda dan status iuran diperbarui dalam 1x24 jam.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


