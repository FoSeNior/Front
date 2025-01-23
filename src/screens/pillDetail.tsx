import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  PillDetail: { name: string; image: string; effect: string; caution: string };
};

const PillDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PillDetail'>>();
  const { name, image, effect, caution } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  // 즐겨찾기 버튼 클릭 핸들러
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // TODO: 서버로 즐겨찾기 상태를 업데이트하는 요청 추가
  };

  //TODO: 즐겨찾기 버튼 수정
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{name}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
              ❤️
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        {/* 약 정보 */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>효능</Text>
          <Text style={styles.info}>{effect}</Text>
          <Text style={styles.label}>주의사항</Text>
          <Text style={styles.info}>{caution}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 이름 가운데
    marginBottom: 20,
    position: 'relative', // 즐겨찾기 버튼
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4B4B',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: 15,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#D3D3D3', // 기본상태 회색
  },
  favoriteActive: {
    color: '#FF6B6B', // 활성상태 빨간색
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: { width: 200, height: 200, backgroundColor: '#DDD', borderRadius: 10 },
  infoContainer: { marginVertical: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#6E83B7' },
  info: { fontSize: 16, marginBottom: 15, color: '#4B4B4B' },
});

export default PillDetailScreen;
