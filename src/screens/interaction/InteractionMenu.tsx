import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

const FEATURE_SHORTCUTS = [
  { id: 'forum', title: 'Forum Komunitas', description: 'Diskusi dan berbagi ide dengan anggota lain.', icon: 'comments' },
  { id: 'event', title: 'Acara & Webinar', description: 'Ikuti kegiatan online/offline terbaru.', icon: 'calendar-check' },
  { id: 'volunteer', title: 'Volunteer', description: 'Daftar untuk kegiatan sosial Baramuda.', icon: 'hands-helping' },
];

const COMMUNITY_POSTS = [
  {
    id: '1',
    author: 'Bambang S',
    time: '2 jam lalu',
    content: 'Terima kasih tim Baramuda! Event pelatihan marketing sangat membantu UMKM kami meningkatkan penjualan.',
    likes: 24,
    comments: 4,
  },
  {
    id: '2',
    author: 'Lina P',
    time: '5 jam lalu',
    content: 'Halo semua, ada yang berminat kolaborasi untuk program literasi keuangan di sekolah minggu depan?',
    likes: 18,
    comments: 7,
  },
];

const UPCOMING_SESSIONS = [
  { id: 'a', title: 'Town Hall Komunitas', date: 'Rabu, 19 Maret 2025', time: '19.00 WIB', medium: 'Zoom Meeting' },
  { id: 'b', title: 'Sesi Q&A Founder', date: 'Jumat, 28 Maret 2025', time: '20.00 WIB', medium: 'Instagram Live' },
];

export default function InteractionMenu({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingTop: insets.top }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: normalize(24) + insets.bottom }}
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
            Ruang Interaksi
          </Text>
          <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, lineHeight: normalize(20) }}>
            Terhubung dengan komunitas Baramuda: forum, kegiatan, dan kolaborasi terbaru untuk Anda.
          </Text>
        </View>

        {/* Shortcut Cards */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(24) }}>
          <Text style={{ fontSize: normalize(18), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(16) }}>
            Pilihan Cepat
          </Text>

          {FEATURE_SHORTCUTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: COLOR.WHITE,
                borderRadius: normalize(18),
                padding: normalize(16),
                marginBottom: normalize(14),
                borderWidth: 1,
                borderColor: COLOR.SECONDARY,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              activeOpacity={0.85}
            >
              <View
                style={{
                  width: normalize(48),
                  height: normalize(48),
                  borderRadius: normalize(24),
                  backgroundColor: COLOR.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: normalize(12),
                }}
              >
                <Icon name={item.icon} size={normalize(18)} color={COLOR.SECONDARY} solid />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY }}>{item.title}</Text>
                <Text style={{ fontSize: normalize(12), color: COLOR.GRAY, marginTop: normalize(6) }}>{item.description}</Text>
              </View>
              <Icon name="chevron-right" size={normalize(14)} color={COLOR.PRIMARY} solid />
            </TouchableOpacity>
          ))}
        </View>

        {/* Community Posts */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(10) }}>
          <Text style={{ fontSize: normalize(18), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(16) }}>
            Cerita Komunitas
          </Text>

          {COMMUNITY_POSTS.map((post) => (
            <View
              key={post.id}
              style={{
                backgroundColor: COLOR.WHITE,
                borderRadius: normalize(18),
                padding: normalize(16),
                marginBottom: normalize(14),
                borderWidth: 1,
                borderColor: COLOR.SECONDARY,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(8) }}>
                <Text style={{ fontSize: normalize(14), fontWeight: '700', color: COLOR.PRIMARY }}>{post.author}</Text>
                <Text style={{ fontSize: normalize(12), color: COLOR.GRAY }}>{post.time}</Text>
              </View>
              <Text style={{ fontSize: normalize(13), color: COLOR.PRIMARY, lineHeight: normalize(20) }}>{post.content}</Text>
              <View style={{ flexDirection: 'row', marginTop: normalize(12) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: normalize(20) }}>
                  <Icon name="heart" size={normalize(12)} color={COLOR.PRIMARY} solid />
                  <Text style={{ marginLeft: normalize(6), fontSize: normalize(12), color: COLOR.PRIMARY }}>{post.likes}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="comment-alt" size={normalize(12)} color={COLOR.PRIMARY} solid />
                  <Text style={{ marginLeft: normalize(6), fontSize: normalize(12), color: COLOR.PRIMARY }}>{post.comments}</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  marginTop: normalize(12),
                  backgroundColor: COLOR.PRIMARY,
                  paddingVertical: normalize(10),
                  borderRadius: normalize(16),
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: COLOR.SECONDARY, fontWeight: '700' }}>Balas Diskusi</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Upcoming Sessions */}
        <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(10) }}>
          <Text style={{ fontSize: normalize(18), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(16) }}>
            Sesi Mendatang
          </Text>

          {UPCOMING_SESSIONS.map((session) => (
            <View
              key={session.id}
              style={{
                backgroundColor: COLOR.SECONDARY,
                borderRadius: normalize(18),
                padding: normalize(16),
                marginBottom: normalize(14),
              }}
            >
              <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(6) }}>
                {session.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(4) }}>
                <Icon name="calendar" size={normalize(12)} color={COLOR.PRIMARY} solid />
                <Text style={{ marginLeft: normalize(8), color: COLOR.PRIMARY, fontSize: normalize(12) }}>{session.date}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(8) }}>
                <Icon name="clock" size={normalize(12)} color={COLOR.PRIMARY} solid />
                <Text style={{ marginLeft: normalize(8), color: COLOR.PRIMARY, fontSize: normalize(12) }}>{session.time}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(12) }}>
                <Icon name="video" size={normalize(12)} color={COLOR.PRIMARY} solid />
                <Text style={{ marginLeft: normalize(8), color: COLOR.PRIMARY, fontSize: normalize(12) }}>{session.medium}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: COLOR.PRIMARY,
                  paddingHorizontal: normalize(18),
                  paddingVertical: normalize(10),
                  borderRadius: normalize(16),
                }}
              >
                <Text style={{ color: COLOR.SECONDARY, fontWeight: '700' }}>Daftar & Dapatkan Link</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


