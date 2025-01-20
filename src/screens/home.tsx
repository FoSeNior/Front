import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  const [userName, setUserName] = useState("김ㅇㅇ");

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.greeting}>안녕하세요, {userName}</Text>

            {/* 날짜와 예정된 복약 및 병원 방문 */}
            <View style={styles.card}>
                <Text style={styles.date}>2025년 01월 14일 화요일</Text>
                <View style={styles.infoRow}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.infoText}>예정된 복약 없음</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.infoText}>예정된 병원 방문 없음</Text>
                </View>
            </View>

            {/* 내가 저장한 병원/약 */}
            <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.buttonText}>내가 저장한 병원/약</Text>
            </TouchableOpacity>

            {/* 주변 가까운 병원 알아보기 */}
            <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.buttonText}>주변 가까운 병원 알아보기</Text>
            </TouchableOpacity>

            {/* 알림 추가/삭제 버튼 */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.smallCard}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.smallCardTitle}>복약 알림</Text>
                <Text style={styles.smallCardSubtitle}>복약 알림 추가/삭제하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallCard}>  
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.smallCardTitle}>병원 방문 알림</Text>
                <Text style={styles.smallCardSubtitle}>병원 알림 추가/삭제하기</Text>
                </TouchableOpacity>
            </View>

            {/* 약 정보 검색하기 */}
            <TouchableOpacity style={styles.button}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.buttonText}>약 정보 검색하기</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flexGrow: 1, // ScrollView가 콘텐츠에 맞게 늘어나도록 설정
    paddingHorizontal: '5%', // 좌우 여백을 %로 조정
    backgroundColor: '#F8F8F8',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'left',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '11%',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '3%',
    textAlign: 'center',
    color: '#6E83B7',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: '3%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  infoText: {
    fontSize: 20,
    color: '#4B4B4B',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '8%',
    borderRadius: 15,
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E83B7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  smallCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: '8%', 
    paddingHorizontal: '3%',
    marginHorizontal: '2%', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginTop: '3%',
  },
  smallCardSubtitle: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: '2%',
  },
});


export default HomeScreen;