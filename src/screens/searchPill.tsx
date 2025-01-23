import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  PillDetail: { name: string; image: string; effect: string; caution: string };
};

type Pill = {
  id: string;
  name: string;
  image: string;
  effect: string;
  caution: string;
};

const dummyPills: Pill[] = [
  {
    id: '1',
    name: '알레그라정 200mg',
    image: 'https://dummyimage.com/150x100/cccccc/000000&text=알레그라',
    effect: '알레르기 완화, 가려움증 개선',
    caution: '운전 시 주의, 졸음 유발 가능',
  },
  {
    id: '2',
    name: '타이레놀 500mg',
    image: 'https://dummyimage.com/150x100/cccccc/000000&text=타이레놀',
    effect: '해열 및 진통 완화',
    caution: '간 손상 위험, 복용량 초과 금지',
  },
];

const SearchPillScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const filteredPills = dummyPills.filter((pill) =>
    pill.name.includes(searchText)
  );

  const renderPillItem = ({ item }: { item: Pill }) => (
    <TouchableOpacity
      style={styles.pillItem}
      onPress={() =>
        navigation.navigate('PillDetail', {
          name: item.name,
          image: item.image,
          effect: item.effect,
          caution: item.caution,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.pillImage} />
      <View style={styles.pillDetails}>
        <Text style={styles.pillName}>제품명: {item.name}</Text>
        <Text style={styles.pillEffect}>{item.effect}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>알약 정보 검색</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="이곳을 눌러 입력해주세요."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredPills}
          keyExtractor={(item) => item.id}
          renderItem={renderPillItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 16 },
  searchButton: { marginLeft: 10 },
  searchButtonText: { fontSize: 18, color: '#6E83B7' },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    marginBottom: 10,
  },
  pillImage: { width: 50, height: 50, marginRight: 10 },
  pillDetails: { flex: 1 },
  pillName: { fontSize: 16, fontWeight: 'bold' },
  pillEffect: { fontSize: 14, color: '#6E83B7' },
});

export default SearchPillScreen;
