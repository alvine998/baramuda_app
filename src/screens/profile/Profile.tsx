import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { COLOR } from '../../utils/Color';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

interface ProfileProps {
  navigation: any;
}

interface MenuItem {
  id: number;
  title: string;
  subtitle?: string;
  icon: string;
  action: () => void;
  color?: string;
}

export default function Profile({ navigation }: ProfileProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  // User profile data
  const userProfile = {
    name: 'Admin User',
    email: 'admin@baramuda08.id',
    phone: '+62 812 3456 7890',
    joinDate: 'Oktober 2024',
    location: 'Jakarta, Indonesia',
    bio: 'Relawan aktif Baramuda 08 yang berkomitmen untuk kemajuan Indonesia melalui dukungan penuh terhadap visi Asta Cita Presiden Prabowo Subianto.',
    avatar: 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=AU',
    level: 'Bronze',
    points: 1250,
    achievements: 8,
    volunteerHours: 156,
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Edit Profil',
      subtitle: 'Perbarui informasi pribadi',
      icon: 'user-edit',
      action: () => setIsEditMode(true),
      color: COLOR.PRIMARY,
    },
    {
      id: 2,
      title: 'Aktivitas Relawan',
      subtitle: `${userProfile.volunteerHours} jam kegiatan`,
      icon: 'clock',
      action: () => navigation.navigate('VolunteerActivity'),
      color: COLOR.SUCCESS,
    },
    {
      id: 3,
      title: 'Pencapaian',
      subtitle: `${userProfile.achievements} badge diperoleh`,
      icon: 'trophy',
      action: () => navigation.navigate('Achievements'),
    },
    {
      id: 4,
      title: 'Kontribusi Kampanye',
      subtitle: 'Lihat dampak Anda',
      icon: 'chart-line' as any,
      action: () => navigation.navigate('Contributions'),
      color: COLOR.INFO,
    },
    {
      id: 5,
      title: 'Pengaturan',
      subtitle: 'Notifikasi, privasi, keamanan',
      icon: 'cog',
      action: () => navigation.navigate('Settings'),
      color: COLOR.PRIMARY,
    },
    {
      id: 6,
      title: 'Bantuan & Dukungan',
      subtitle: 'FAQ, kontak admin',
      icon: 'question-circle',
      action: () => navigation.navigate('Help'),
      color: COLOR.WARNING,
    },
    {
      id: 7,
      title: 'Keluar',
      subtitle: 'Keluar dari akun',
      icon: 'sign-out-alt',
      action: handleLogout,
      color: COLOR.DANGER,
    },
  ];

  function handleLogout() {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin keluar dari akun?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Berhasil Keluar',
              text2: 'Sampai jumpa lagi!',
              position: 'top',
            });
            // Navigate back to Prelogin
            navigation.reset({
              index: 0,
              routes: [{ name: 'Prelogin' }],
            });
          },
        },
      ]
    );
  }

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={{
        backgroundColor: COLOR.WHITE,
        borderRadius: normalize(15),
        marginBottom: normalize(12),
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }}
      onPress={item.action}
      activeOpacity={0.9}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: normalize(20),
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: normalize(50),
            height: normalize(50),
            borderRadius: normalize(25),
            backgroundColor: item.color || COLOR.PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: normalize(15),
          }}
        >
          <Icon
            name={item.icon as any}
            size={normalize(20)}
            color={COLOR.WHITE}
            solid
          />
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: normalize(16),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              marginBottom: normalize(4),
            }}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={{
                fontSize: normalize(12),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>

        {/* Arrow */}
        <Icon
          name="chevron-right"
          size={normalize(14)}
          color={COLOR.GRAY}
          solid
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: normalize(20),
          paddingTop: normalize(50),
          paddingBottom: normalize(20),
          backgroundColor: COLOR.SECONDARY,
          borderBottomLeftRadius: normalize(20),
          borderBottomRightRadius: normalize(20),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: normalize(40),
            height: normalize(40),
            borderRadius: normalize(20),
            backgroundColor: COLOR.PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="arrow-left"
            size={normalize(16)}
            color={COLOR.SECONDARY}
            solid
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: normalize(18),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
          }}
        >
          Profil Saya
        </Text>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            width: normalize(40),
            height: normalize(40),
            borderRadius: normalize(20),
            backgroundColor: COLOR.PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="bars"
            size={normalize(16)}
            color={COLOR.SECONDARY}
            solid
          />
        </TouchableOpacity>
      </View>

      {/* Profile Header Card */}
      <View
        style={{
          margin: normalize(20),
          backgroundColor: COLOR.WHITE,
          borderRadius: normalize(20),
          padding: normalize(25),
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        }}
      >
        {/* Profile Picture and Basic Info */}
        <View style={{ alignItems: 'center', marginBottom: normalize(25) }}>
          <View
            style={{
              width: normalize(100),
              height: normalize(100),
              borderRadius: normalize(50),
              backgroundColor: COLOR.PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: normalize(15),
              borderWidth: 3,
              borderColor: COLOR.SECONDARY,
            }}
          >
            <Image
              source={{ uri: userProfile.avatar }}
              style={{
                width: normalize(90),
                height: normalize(90),
                borderRadius: normalize(45),
              }}
            />
          </View>

          <Text
            style={{
              fontSize: normalize(20),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              marginBottom: normalize(5),
            }}
          >
            {userProfile.name}
          </Text>

          <Text
            style={{
              fontSize: normalize(14),
              color: COLOR.GRAY,
              textAlign: 'center',
            }}
          >
            {userProfile.email}
          </Text>
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: normalize(20),
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: normalize(50),
                height: normalize(50),
                borderRadius: normalize(25),
                backgroundColor: COLOR.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: normalize(8),
              }}
            >
              <Icon
                name="star"
                size={normalize(20)}
                color={COLOR.SECONDARY}
                solid
              />
            </View>
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
              }}
            >
              {userProfile.points}
            </Text>
            <Text
              style={{
                fontSize: normalize(10),
                color: COLOR.GRAY,
              }}
            >
              Poin
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: normalize(50),
                height: normalize(50),
                borderRadius: normalize(25),
                backgroundColor: COLOR.SUCCESS,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: normalize(8),
              }}
            >
              <Icon
                name="trophy"
                size={normalize(20)}
                color={COLOR.WHITE}
                solid
              />
            </View>
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
              }}
            >
              {userProfile.achievements}
            </Text>
            <Text
              style={{
                fontSize: normalize(10),
                color: COLOR.GRAY,
              }}
            >
              Badge
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: normalize(50),
                height: normalize(50),
                borderRadius: normalize(25),
                backgroundColor: COLOR.INFO,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: normalize(8),
              }}
            >
              <Icon
                name="clock"
                size={normalize(20)}
                color={COLOR.WHITE}
                solid
              />
            </View>
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
              }}
            >
              {userProfile.volunteerHours}
            </Text>
            <Text
              style={{
                fontSize: normalize(10),
                color: COLOR.GRAY,
              }}
            >
              Jam
            </Text>
          </View>
        </View>

        {/* Level Badge */}
        <View
          style={{
            alignItems: 'center',
            padding: normalize(15),
            backgroundColor: '#FFF8DC',
            borderRadius: normalize(15),
          }}
        >
          <Icon
            name="crown"
            size={normalize(20)}
            color="#FFD700"
            solid
            style={{ marginBottom: normalize(8) }}
          />
          <Text
            style={{
              fontSize: normalize(14),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
            }}
          >
            Level {userProfile.level}
          </Text>
        </View>
      </View>

      {/* Profile Details */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          marginBottom: normalize(20),
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            padding: normalize(20),
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}
        >
          <Text
            style={{
              fontSize: normalize(16),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
              marginBottom: normalize(15),
            }}
          >
            Informasi Profil
          </Text>

          <View style={{ marginBottom: normalize(15) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(8) }}>
              <Icon name="phone" size={normalize(16)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12), width: normalize(20) }} />
              <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, flex: 1 }}>
                {userProfile.phone}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(8) }}>
              <Icon name="map-marker-alt" size={normalize(16)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12), width: normalize(20) }} />
              <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, flex: 1 }}>
                {userProfile.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="calendar-alt" size={normalize(16)} color={COLOR.PRIMARY} solid style={{ marginRight: normalize(12), width: normalize(20) }} />
              <Text style={{ fontSize: normalize(14), color: COLOR.DARK_GRAY, flex: 1 }}>
                Bergabung sejak {userProfile.joinDate}
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: normalize(12),
              backgroundColor: '#F8F9FA',
              borderRadius: normalize(10),
            }}
          >
            <Text
              style={{
                fontSize: normalize(12),
                color: COLOR.DARK_GRAY,
                lineHeight: normalize(18),
                textAlign: 'justify',
              }}
            >
              {userProfile.bio}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={{ paddingHorizontal: normalize(20) }}>
        {menuItems.map((item) => (
          <View key={item.id}>
            {renderMenuItem({ item })}
          </View>
        ))}
      </View>

      {/* Footer */}
      <View
        style={{
          padding: normalize(20),
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: normalize(12),
            color: COLOR.GRAY,
            textAlign: 'center',
          }}
        >
          Baramuda 08 - Profil Relawan
        </Text>
      </View>
    </ScrollView>
  );
}
