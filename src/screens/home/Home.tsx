import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Animated, Dimensions, RefreshControl, TextInput } from 'react-native';
import { COLOR } from '../../utils/Color';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { width } = Dimensions.get('window');
  const slideWidth = width - normalize(40); // Account for container margins
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const carouselData = [
    {
      id: 1,
      icon: 'star' as const,
      title: 'Selamat Datang di Baramuda!',
      description: 'Nikmati pengalaman terbaik dengan fitur-fitur terbaru kami',
      color: COLOR.PRIMARY,
    },
    {
      id: 2,
      icon: 'rocket' as const,
      title: 'Fitur Baru Tersedia!',
      description: 'Temukan kemudahan dalam mengelola data Anda',
      color: '#FF6B35',
    },
    {
      id: 3,
      icon: 'shield-alt' as const,
      title: 'Keamanan Terjamin',
      description: 'Data Anda aman dengan sistem keamanan terdepan',
      color: '#2E8B57',
    },
  ];

  // Auto-advance carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Animate slide changes
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: -currentSlide * slideWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentSlide]);

  const handleSlidePress = (index: number) => {
    setCurrentSlide(index);
  };

  const handleLogout = () => {
    Toast.show({
      type: 'info',
      text1: 'Logout Berhasil',
      text2: 'Sampai jumpa lagi!',
      position: 'top',
    });
    // Navigate back to Prelogin screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Prelogin' }],
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Toast.show({
        type: 'info',
        text1: 'Pencarian',
        text2: `Mencari: ${searchQuery}`,
        position: 'top',
      });
      // Add your search logic here
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // Simulate refreshing data
    setTimeout(() => {
      // Reset carousel to first slide
      setCurrentSlide(0);
      // Reset animation value
      slideAnim.setValue(0);

      Toast.show({
        type: 'success',
        text1: 'Data Diperbarui',
        text2: 'Konten telah diperbarui dengan data terbaru',
        position: 'top',
      });

      setRefreshing(false);
    }, 2000); // Simulate 2 second refresh time
  }, [slideAnim]);

  const currentUser = {
    name: 'Admin User',
    email: 'admin@gmail.com',
    joinDate: 'Oktober 2024',
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLOR.WHITE,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLOR.PRIMARY]}
          tintColor={COLOR.PRIMARY}
          title="Menarik untuk memperbarui..."
          titleColor={COLOR.PRIMARY}
        />
      }
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          paddingTop: normalize(50),
          paddingBottom: normalize(20),
          backgroundColor: COLOR.SECONDARY,
          borderBottomLeftRadius: normalize(20),
          borderBottomRightRadius: normalize(20),
        }}
      >
        {/* Header Row - Search Bar and User Icon */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left - Search Bar */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLOR.WHITE,
              borderRadius: normalize(25),
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(8),
              marginRight: normalize(15),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Icon
              name="search"
              size={normalize(16)}
              color={COLOR.GRAY}
              solid
              style={{ marginRight: normalize(10) }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: normalize(14),
                color: COLOR.PRIMARY,
                paddingVertical: normalize(5),
              }}
              placeholder="Cari produk, layanan, atau informasi..."
              placeholderTextColor={COLOR.GRAY}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={{ marginLeft: normalize(10) }}
              >
                <Icon
                  name="times"
                  size={normalize(14)}
                  color={COLOR.GRAY}
                  solid
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Right - User Icon */}
          <TouchableOpacity
            onPress={handleProfilePress}
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
              name="user"
              size={normalize(20)}
              color={COLOR.SECONDARY}
              solid
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          paddingVertical: normalize(20),
          backgroundColor: COLOR.WHITE,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: normalize(15),
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(4),
              }}
            >
              Halo, {currentUser.name}! 👋
            </Text>
            <Text
              style={{
                fontSize: normalize(14),
                color: COLOR.GRAY,
              }}
            >
              Apa yang ingin Anda lakukan hari ini?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: COLOR.PRIMARY,
              paddingHorizontal: normalize(20),
              paddingVertical: normalize(12),
              borderRadius: normalize(25),
              shadowColor: COLOR.PRIMARY,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.WHITE,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Carousel Banner */}
      
      {/* Services Section */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          marginBottom: normalize(25),
        }}
      >
        <Text
          style={{
            fontSize: normalize(20),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
            marginBottom: normalize(20),
          }}
        >
          Layanan Kami
        </Text>
        
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(20),
            padding: normalize(20),
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 4,
            // },
            // shadowOpacity: 0.1,
            // shadowRadius: 12,
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {/* Mart */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
              onPress={() => navigation.navigate('Mart')}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#FF6B35',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#FF6B35',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="shopping-cart"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                Mart
              </Text>
            </TouchableOpacity>

            {/* Event */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#4ECDC4',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#4ECDC4',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="calendar-alt"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                Event
              </Text>
            </TouchableOpacity>

            {/* Near Member */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#45B7D1',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#45B7D1',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="users"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                Near Member
              </Text>
            </TouchableOpacity>

            {/* PPOB */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#96CEB4',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#96CEB4',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="credit-card"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                PPOB
              </Text>
            </TouchableOpacity>

            {/* Media */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
              onPress={() => navigation.navigate('Media')}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#FECA57',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#FECA57',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="play-circle"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                Media
              </Text>
            </TouchableOpacity>

            {/* About Us */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
              onPress={() => navigation.navigate('AboutUs')}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#A8E6CF',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#A8E6CF',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="info-circle"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                About Us
              </Text>
            </TouchableOpacity>

            {/* Interaction */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#DDA0DD',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#DDA0DD',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="comments"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                Interaction
              </Text>
            </TouchableOpacity>

            {/* SOS */}
            <TouchableOpacity
              style={{
                width: '22%',
                alignItems: 'center',
                marginBottom: normalize(20),
              }}
            >
              <View
                style={{
                  width: normalize(60),
                  height: normalize(60),
                  backgroundColor: '#FF6B6B',
                  borderRadius: normalize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: normalize(8),
                  shadowColor: '#FF6B6B',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Icon
                  name="exclamation-triangle"
                  size={normalize(24)}
                  color={COLOR.WHITE}
                  solid
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontWeight: '600',
                  color: COLOR.PRIMARY,
                  textAlign: 'center',
                }}
              >
                SOS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* News Section */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          marginBottom: normalize(30),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: normalize(20),
          }}
        >
          <Text
            style={{
              fontSize: normalize(20),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
            }}
          >
            Berita Terbaru
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: '600',
                color: COLOR.PRIMARY,
              }}
            >
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>

        {/* News Card 1 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(16),
            marginBottom: normalize(16),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(140),
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
              }}
            />
            <Icon
              name="newspaper"
              size={normalize(40)}
              color={COLOR.WHITE}
              solid
              style={{ zIndex: 1 }}
            />
            <View
              style={{
                position: 'absolute',
                top: normalize(12),
                right: normalize(12),
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingHorizontal: normalize(8),
                paddingVertical: normalize(4),
                borderRadius: normalize(12),
              }}
            >
              <Text
                style={{
                  fontSize: normalize(10),
                  fontWeight: '600',
                  color: COLOR.WHITE,
                }}
              >
                TERBARU
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: normalize(16),
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(8),
                lineHeight: normalize(22),
              }}
            >
              Update Fitur Terbaru Baramuda App
            </Text>
            <Text
              style={{
                fontSize: normalize(13),
                color: COLOR.GRAY,
                lineHeight: normalize(18),
                marginBottom: normalize(12),
              }}
            >
              Kami telah menambahkan fitur-fitur menarik untuk meningkatkan pengalaman pengguna.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: normalize(11),
                  color: COLOR.GRAY,
                }}
              >
                2 jam yang lalu
              </Text>
              <Icon
                name="arrow-right"
                size={normalize(12)}
                color={COLOR.PRIMARY}
                solid
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* News Card 2 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(16),
            marginBottom: normalize(16),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(140),
              backgroundColor: '#4ECDC4',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(78, 205, 196, 0.8)',
              }}
            />
            <Icon
              name="shield-alt"
              size={normalize(40)}
              color={COLOR.WHITE}
              solid
              style={{ zIndex: 1 }}
            />
          </View>
          <View
            style={{
              padding: normalize(16),
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(8),
                lineHeight: normalize(22),
              }}
            >
              Keamanan Data Terjamin
            </Text>
            <Text
              style={{
                fontSize: normalize(13),
                color: COLOR.GRAY,
                lineHeight: normalize(18),
                marginBottom: normalize(12),
              }}
            >
              Sistem keamanan terbaru telah diimplementasikan untuk melindungi data pengguna.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: normalize(11),
                  color: COLOR.GRAY,
                }}
              >
                5 jam yang lalu
              </Text>
              <Icon
                name="arrow-right"
                size={normalize(12)}
                color={COLOR.PRIMARY}
                solid
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* News Card 3 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(16),
            marginBottom: normalize(16),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(140),
              backgroundColor: '#FECA57',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(254, 202, 87, 0.8)',
              }}
            />
            <Icon
              name="rocket"
              size={normalize(40)}
              color={COLOR.WHITE}
              solid
              style={{ zIndex: 1 }}
            />
          </View>
          <View
            style={{
              padding: normalize(16),
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(8),
                lineHeight: normalize(22),
              }}
            >
              Peluncuran Fitur Baru
            </Text>
            <Text
              style={{
                fontSize: normalize(13),
                color: COLOR.GRAY,
                lineHeight: normalize(18),
                marginBottom: normalize(12),
              }}
            >
              Fitur inovatif telah diluncurkan untuk memudahkan aktivitas pengguna sehari-hari.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: normalize(11),
                  color: COLOR.GRAY,
                }}
              >
                1 hari yang lalu
              </Text>
              <Icon
                name="arrow-right"
                size={normalize(12)}
                color={COLOR.PRIMARY}
                solid
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
