import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Animated, Dimensions, RefreshControl } from 'react-native';
import { COLOR } from '../../utils/Color';
import normalize from 'react-native-normalize';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import Toast from 'react-native-toast-message';

interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const [notificationCount] = React.useState(3); // Example notification count
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
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

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
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
        {/* Left - User Icon */}
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
          <FontAwesome5
            name="user"
            size={normalize(20)}
            color={COLOR.SECONDARY}
            iconStyle="solid"
          />
        </TouchableOpacity>

        {/* Middle - Logo */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: normalize(50),
              height: normalize(50),
            }}
          />
        </View>

        {/* Right - Bell & Menu */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Notification Bell */}
          <TouchableOpacity
            onPress={handleNotificationPress}
            style={{
              position: 'relative',
              padding: normalize(8),
              marginRight: normalize(10),
            }}
          >
            <FontAwesome5
              name="bell"
              size={normalize(20)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: normalize(2),
                  right: normalize(2),
                  backgroundColor: '#FF4444',
                  borderRadius: normalize(10),
                  minWidth: normalize(18),
                  height: normalize(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: normalize(4),
                }}
              >
                <Text
                  style={{
                    color: COLOR.WHITE,
                    fontSize: normalize(10),
                    fontWeight: 'bold',
                  }}
                >
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Hamburger Menu - Opens Drawer */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              padding: normalize(8),
            }}
          >
            <FontAwesome5
              name="bars"
              size={normalize(20)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: normalize(20),
          paddingVertical: normalize(15),
        }}
      >
        {/* Left - Welcome Message */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: normalize(16),
              fontWeight: 'bold',
              color: COLOR.PRIMARY,
            }}
          >
            Selamat Datang, {currentUser.name}
          </Text>
        </View>

        {/* Right - Login Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: COLOR.PRIMARY,
            paddingHorizontal: normalize(15),
            paddingVertical: normalize(8),
            borderRadius: normalize(20),
          }}
        >
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: 'bold',
              color: COLOR.WHITE,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* Carousel Banner */}
      <View
        style={{
          marginHorizontal: normalize(20),
          marginBottom: normalize(20),
        }}
      >
        <View
          style={{
            height: normalize(200),
            borderRadius: normalize(15),
            overflow: 'hidden',
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
          <Animated.View
            style={{
              flexDirection: 'row',
              width: slideWidth * carouselData.length,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {carouselData.map((item, index) => (
              <View
                key={item.id}
                style={{
                  width: slideWidth,
                  backgroundColor: item.color,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: normalize(20),
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleSlidePress(index)}
                  activeOpacity={0.9}
                >
                  <FontAwesome5
                    name={item.icon}
                    size={normalize(30)}
                    color={COLOR.WHITE}
                    style={{ marginBottom: normalize(10) }}
                    iconStyle="solid"
                  />
                  <Text
                    style={{
                      fontSize: normalize(18),
                      fontWeight: 'bold',
                      color: COLOR.WHITE,
                      textAlign: 'center',
                      marginBottom: normalize(8),
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: COLOR.WHITE,
                      opacity: 0.9,
                      textAlign: 'center',
                      lineHeight: normalize(20),
                    }}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>

          {/* Indicator Dots */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: normalize(10),
              backgroundColor: carouselData[currentSlide].color,
            }}
          >
            {carouselData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlidePress(index)}
                style={{
                  width: normalize(8),
                  height: normalize(8),
                  borderRadius: normalize(4),
                  backgroundColor: index === currentSlide ? COLOR.WHITE : 'rgba(255,255,255,0.5)',
                  marginHorizontal: normalize(3),
                }}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Feature Grid */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          marginBottom: normalize(20),
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
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => navigation.navigate('Mart')}
          >
            <FontAwesome5
              name="shopping-cart"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              Mart
            </Text>
          </TouchableOpacity>

          {/* Event */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
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
            <FontAwesome5
              name="calendar-alt"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              Event
            </Text>
          </TouchableOpacity>

          {/* Near Member */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
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
            <FontAwesome5
              name="users"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              Near Member
            </Text>
          </TouchableOpacity>

          {/* PPOB */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
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
            <FontAwesome5
              name="credit-card"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              PPOB
            </Text>
          </TouchableOpacity>

          {/* Media */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => navigation.navigate('Media')}
          >
            <FontAwesome5
              name="play-circle"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              Media
            </Text>
          </TouchableOpacity>

          {/* About Us */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => navigation.navigate('AboutUs')}
          >
            <FontAwesome5
              name="info-circle"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              About Us
            </Text>
          </TouchableOpacity>

          {/* Interaction */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: COLOR.PRIMARY,
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
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
            <FontAwesome5
              name="comments"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              Interaction
            </Text>
          </TouchableOpacity>

          {/* SOS */}
          <TouchableOpacity
            style={{
              width: '23%',
              backgroundColor: "#FF4444",
              borderRadius: normalize(15),
              padding: normalize(15),
              marginBottom: normalize(15),
              alignItems: 'center',
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
            <FontAwesome5
              name="exclamation-triangle"
              size={normalize(24)}
              color={COLOR.SECONDARY}
              style={{ marginBottom: normalize(8) }}
              iconStyle="solid"
            />
            <Text
              style={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                color: COLOR.WHITE,
                textAlign: 'center',
              }}
            >
              SOS
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* News Section */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          marginBottom: normalize(20),
        }}
      >
        <Text
          style={{
            fontSize: normalize(18),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
            marginBottom: normalize(15),
          }}
        >
          Berita Terbaru
        </Text>

        {/* News Card 1 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            marginBottom: normalize(15),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(120),
              backgroundColor: '#E5E5E5',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="newspaper"
              size={normalize(30)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </View>
          <View
            style={{
              padding: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(6),
              }}
            >
              Update Fitur Terbaru Baramuda App
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              Kami telah menambahkan fitur-fitur menarik untuk meningkatkan pengalaman pengguna.
            </Text>
          </View>
        </TouchableOpacity>

        {/* News Card 2 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            marginBottom: normalize(15),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(120),
              backgroundColor: '#F0F8FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="shield-alt"
              size={normalize(30)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </View>
          <View
            style={{
              padding: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(6),
              }}
            >
              Keamanan Data Terjamin
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              Sistem keamanan terbaru telah diimplementasikan untuk melindungi data pengguna.
            </Text>
          </View>
        </TouchableOpacity>

        {/* News Card 3 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            marginBottom: normalize(15),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(120),
              backgroundColor: '#FFF8DC',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="rocket"
              size={normalize(30)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </View>
          <View
            style={{
              padding: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(6),
              }}
            >
              Peluncuran Fitur Baru
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              Fitur inovatif telah diluncurkan untuk memudahkan aktivitas pengguna sehari-hari.
            </Text>
          </View>
        </TouchableOpacity>

        {/* News Card 4 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            marginBottom: normalize(15),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(120),
              backgroundColor: '#F0FFF0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="users"
              size={normalize(30)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </View>
          <View
            style={{
              padding: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(6),
              }}
            >
              Komunitas Pengguna Berkembang
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              Komunitas pengguna Baramuda semakin aktif dengan berbagai kegiatan interaktif.
            </Text>
          </View>
        </TouchableOpacity>

        {/* News Card 5 */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.WHITE,
            borderRadius: normalize(15),
            marginBottom: normalize(15),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('NewsDetail')}
          activeOpacity={0.9}
        >
          <View
            style={{
              height: normalize(120),
              backgroundColor: '#FFF0F5',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="calendar-check"
              size={normalize(30)}
              color={COLOR.PRIMARY}
              iconStyle="solid"
            />
          </View>
          <View
            style={{
              padding: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: 'bold',
                color: COLOR.PRIMARY,
                marginBottom: normalize(6),
              }}
            >
              Event Spesial Bulan Ini
            </Text>
            <Text
              style={{
                fontSize: normalize(11),
                color: COLOR.GRAY,
                lineHeight: normalize(16),
              }}
            >
              Jangan lewatkan event spesial dengan berbagai hadiah menarik untuk pengguna setia.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
