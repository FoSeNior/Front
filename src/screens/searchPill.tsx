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
import { useFavorites } from '../context/favorites';

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
    image: 'https://via.placeholder.com/150',
    effect: '알레르기 완화, 가려움증 개선',
    caution: '운전 시 주의, 졸음 유발 가능',
  },
  {
    id: '2',
    name: '타이레놀 500mg',
    image: 'https://via.placeholder.com/150',
    effect: '해열 및 진통 완화',
    caution: '간 손상 위험, 복용량 초과 금지',
  },
];

const SearchPillScreen = () => {
  const [searchText, setSearchText] = useState('');
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp<any>>();

  const filteredPills = dummyPills.filter((pill) =>
    pill.name.includes(searchText)
  );

  const renderPillItem = ({ item }: { item: Pill }) => (
    <TouchableOpacity
      style={styles.pillItem}
      onPress={() =>
        navigation.navigate('PillDetail', {
          id: item.id,
          name: item.name,
          image: item.image,
          effect: item.effect,
          caution: item.caution,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.pillImage} />
      <View style={styles.pillDetails}>
        <Text style={styles.pillName}>{item.name}</Text>
        <Text style={styles.pillEffect}>{item.effect}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
        <Text style={[styles.favoriteIcon, favorites.includes(item.id) && styles.favoriteIconActive]}>
          ♥
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요."
          value={searchText}
          onChangeText={setSearchText}
        />
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
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  searchInput: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, marginBottom: 20 },
  pillItem: { flexDirection: 'row', padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 8 },
  pillImage: { width: 50, height: 50, marginRight: 10 },
  pillDetails: { flex: 1 },
  pillName: { fontSize: 18, fontWeight: 'bold' },
  pillEffect: { color: '#888' },
  favoriteButton: { padding: 10 },
  favoriteIcon: { fontSize: 20, color: '#CCC' },
  favoriteIconActive: { color: '#FF6B6B' },
});

export default SearchPillScreen;
