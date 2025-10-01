import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { COLOR } from '../../utils/Color';
import normalize from 'react-native-normalize';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';

interface NewsDetailProps {
  navigation: any;
  route: any;
}

export default function NewsDetail({ navigation, route }: NewsDetailProps) {
  // Get news data from route params (you can customize this based on your needs)
  const { newsId } = route.params || {};
  const { newsTitle, newsContent, newsImage } = route.params || {};

  // Sample detailed news content (you can replace this with dynamic data)
  const sampleNewsData = {
    id: newsId || 1,
    title: newsTitle || 'Update Fitur Terbaru Baramuda App',
    image: newsImage || 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=News+Image',
    content: newsContent || `
      Kami sangat excited untuk mengumumkan update terbaru dari Baramuda App yang akan meningkatkan pengalaman pengguna secara signifikan.

      Fitur-fitur baru yang telah kami tambahkan meliputi:

      🎯 Sistem Notifikasi yang Lebih Cerdas
      Pengguna sekarang akan menerima notifikasi yang lebih relevan dan tepat waktu berdasarkan aktivitas dan preferensi mereka.

      🎨 Antarmuka Pengguna yang Diperbaharui
      Desain baru yang lebih modern dan intuitif membuat navigasi aplikasi menjadi lebih mudah dan menyenangkan.

      🔒 Keamanan Data yang Ditingkatkan
      Kami telah mengimplementasikan enkripsi end-to-end untuk semua data pengguna guna memastikan keamanan maksimal.

      📊 Dashboard Analytics
      Fitur baru yang memungkinkan pengguna untuk melihat statistik penggunaan aplikasi mereka dalam bentuk grafik yang menarik.

      🌐 Mode Offline yang Diperluas
      Pengguna sekarang dapat mengakses lebih banyak konten bahkan tanpa koneksi internet.

      Update ini merupakan bagian dari komitmen kami untuk terus meningkatkan kualitas layanan dan memberikan pengalaman terbaik bagi seluruh pengguna Baramuda App.

      Kami berterima kasih atas dukungan dan feedback yang telah diberikan oleh komunitas pengguna. Masukan dari Anda sangat berharga bagi pengembangan aplikasi ini.

      Untuk informasi lebih lanjut tentang update ini dan fitur-fitur lainnya, silakan kunjungi halaman bantuan atau hubungi customer service kami.
    `,
    author: 'Tim Baramuda',
    date: '15 Oktober 2024',
    readTime: '5 menit baca'
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLOR.WHITE,
      }}
      showsVerticalScrollIndicator={false}
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
        {/* Back Button */}
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
          <FontAwesome5
            name="arrow-left"
            size={normalize(16)}
            color={COLOR.SECONDARY}
            iconStyle="solid"
          />
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            fontSize: normalize(18),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
            flex: 1,
            textAlign: 'center',
            marginHorizontal: normalize(10),
          }}
        >
          Detail Berita
        </Text>

        {/* Placeholder for balance */}
        <View style={{ width: normalize(40) }} />
      </View>

      {/* News Image */}
      <View
        style={{
          margin: normalize(20),
          borderRadius: normalize(15),
          overflow: 'hidden',
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
        <Image
          source={{ uri: sampleNewsData.image }}
          style={{
            width: '100%',
            height: normalize(200),
            resizeMode: 'cover',
          }}
        />
      </View>

      {/* News Content */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          paddingBottom: normalize(30),
        }}
      >
        {/* News Meta */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: normalize(15),
            paddingBottom: normalize(15),
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: normalize(12),
                color: COLOR.GRAY,
                marginBottom: normalize(4),
              }}
            >
              Penulis: {sampleNewsData.author}
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                color: COLOR.GRAY,
              }}
            >
              {sampleNewsData.date} • {sampleNewsData.readTime}
            </Text>
          </View>
        </View>

        {/* News Title */}
        <Text
          style={{
            fontSize: normalize(24),
            fontWeight: 'bold',
            color: COLOR.PRIMARY,
            marginBottom: normalize(15),
            lineHeight: normalize(32),
          }}
        >
          {sampleNewsData.title}
        </Text>

        {/* News Content */}
        <Text
          style={{
            fontSize: normalize(16),
            color: COLOR.DARK_GRAY || '#333',
            lineHeight: normalize(26),
            textAlign: 'justify',
          }}
        >
          {sampleNewsData.content}
        </Text>
      </View>

      {/* Footer */}
      <View
        style={{
          padding: normalize(20),
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          marginTop: normalize(20),
        }}
      >
        <Text
          style={{
            fontSize: normalize(12),
            color: COLOR.GRAY,
            textAlign: 'center',
          }}
        >
          Baramuda App - Menyediakan informasi terbaru untuk Anda
        </Text>
      </View>
    </ScrollView>
  );
}
