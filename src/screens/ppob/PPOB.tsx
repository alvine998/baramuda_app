import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface ServiceItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  route?: string;
}

interface ServiceGroup {
  id: string;
  title: string;
  items: ServiceItem[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'pulsa-data',
    title: 'Pulsa & Paket Data',
    items: [
      { id: 'pulsa', label: 'Pulsa', icon: 'mobile-alt', color: '#FF6B6B', route: 'Pulsa' },
      { id: 'paket-data', label: 'Paket Data', icon: 'wifi', color: '#4ECDC4', route: 'PaketData' },
    ],
  },
  {
    id: 'utilities',
    title: 'Tagihan Rumah Tangga',
    items: [
      { id: 'pln-prepaid', label: 'Listrik Prabayar', icon: 'bolt', color: '#FFD93D', route: 'ListrikPrabayar' },
      { id: 'pln-postpaid', label: 'Listrik Pascabayar', icon: 'lightbulb', color: '#FFB037', route: 'ListrikPascabayar' },
      { id: 'water', label: 'Air PDAM', icon: 'tint', color: '#5FADCF', route: 'AirPDAM' },
      { id: 'internet', label: 'Internet Rumah', icon: 'network-wired', color: '#2A9D8F', route: 'Internet' },
    ],
  },
  {
    id: 'financial',
    title: 'Keuangan & Lainnya',
    items: [
      { id: 'bpjs', label: 'Tagihan BPJS', icon: 'heartbeat', color: '#1D3557', route: 'TagihanBPJS' },
      { id: 'angsuran', label: 'Tagihan Angsuran', icon: 'money-check-alt', color: '#2C6E49', route: 'TagihanAngsuran' },
      { id: 'emoney', label: 'Top Up E-Money', icon: 'wallet', color: '#F4A259', route: 'TopupEmoney' },
      { id: 'pajak', label: 'Pajak Daerah', icon: 'file-invoice-dollar', color: '#B5838D', route: 'PajakDaerah' },
    ],
  },
];

interface PPOBProps {
  navigation: any;
}

const Card = ({ icon, label, color, onPress }: ServiceItem & { onPress?: () => void }) => (
  <TouchableOpacity
    style={{
      width: '47%',
      backgroundColor: COLOR.WHITE,
      paddingVertical: normalize(18),
      paddingHorizontal: normalize(16),
      borderRadius: normalize(18),
      marginBottom: normalize(14),
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLOR.SECONDARY,
    }}
    activeOpacity={0.85}
    onPress={onPress}
    disabled={!onPress}
  >
    <View
      style={{
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(24),
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: normalize(12),
      }}
    >
      <Icon name={icon} size={normalize(20)} color={COLOR.WHITE} solid />
    </View>
    <Text style={{ flex: 1, fontSize: normalize(14), fontWeight: '600', color: COLOR.PRIMARY }}>
      {label}
    </Text>
    <Icon name="chevron-right" size={normalize(14)} color={COLOR.GRAY} />
  </TouchableOpacity>
);

export default function PPOB({ navigation }: PPOBProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: normalize(24) + insets.bottom,
        }}
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
            Layanan PPOB
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Bayar semua kebutuhan rutin Anda dengan cepat. Pilih layanan di bawah untuk mulai melakukan pembayaran.
          </Text>
        </View>

        {/* Quick Shortcuts */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(14) }}>
            Favorit Anda
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {SERVICE_GROUPS[0].items.slice(0, 2).map((item) => (
              <TouchableOpacity
                key={`shortcut-${item.id}`}
                style={{
                  width: '48%',
                  backgroundColor: COLOR.PRIMARY,
                  borderRadius: normalize(18),
                  paddingVertical: normalize(20),
                  paddingHorizontal: normalize(16),
                  marginBottom: normalize(14),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                activeOpacity={0.85}
                onPress={item.route ? () => navigation.navigate(item.route) : undefined}
              >
                <View
                  style={{
                    width: normalize(42),
                    height: normalize(42),
                    borderRadius: normalize(21),
                    backgroundColor: COLOR.SECONDARY,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: normalize(12),
                  }}
                >
                  <Icon name={item.icon} size={normalize(18)} color={COLOR.PRIMARY} solid />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: normalize(13), color: COLOR.SECONDARY, fontWeight: '700' }}>{item.label}</Text>
                  <Text style={{ fontSize: normalize(11), color: '#f7ebe2' }}>Bayar lebih cepat</Text>
                </View>
                <Icon name="chevron-right" size={normalize(14)} color={COLOR.SECONDARY} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Service Groups */}
        {SERVICE_GROUPS.map((group) => (
          <View key={group.id} style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(14) }}>
              <View
                style={{
                  width: normalize(8),
                  height: normalize(8),
                  borderRadius: normalize(4),
                  backgroundColor: COLOR.PRIMARY,
                  marginRight: normalize(8),
                }}
              />
              <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY }}>{group.title}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {group.items.map((item) => (
                <Card
                  key={item.id}
                  {...item}
                  onPress={item.route ? () => navigation.navigate(item.route) : undefined}
                />
              ))}
            </View>
          </View>
        ))}

        {/* Info Banner */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <View
            style={{
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(20),
              padding: normalize(20),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: normalize(48),
                  height: normalize(48),
                  borderRadius: normalize(24),
                  backgroundColor: COLOR.SECONDARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: normalize(14),
                }}
              >
                <Icon name="shield-alt" size={normalize(20)} color={COLOR.PRIMARY} solid />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: normalize(15), fontWeight: '700', color: COLOR.SECONDARY, marginBottom: normalize(6) }}>
                  Aman & Terpercaya
                </Text>
                <Text style={{ fontSize: normalize(12), color: '#f7ebe2', lineHeight: normalize(18) }}>
                  Transaksi Anda dilindungi oleh sistem keamanan berlapis. Dapatkan notifikasi instan setelah pembayaran.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


