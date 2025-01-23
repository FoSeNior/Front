import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export type HomeList = {
  PillAlarm: undefined;
  HospitalAlarm : undefined;
  PillSearch : undefined;
  PillAlarmList : undefined;
};

const HomeScreen = () => {
  const userName = useSelector((state: RootState) => state.user.name);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation<NavigationProp<HomeList>>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>안녕하세요, {'김ㅇㅇ님'}</Text>

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
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('PillAlarmList')}
          >
            <Image source={require('../assets/pill.jpg')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>복약 알림</Text>
            <Text style={styles.smallCardSubtitle}>
              복약 알림 추가/삭제하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.smallCard}
            onPress={()=> navigation.navigate('HospitalAlarm')}
          >
            <Image source={require('../assets/pill.jpg')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>병원 방문 알림</Text>
            <Text style={styles.smallCardSubtitle}>
              병원 알림 추가/삭제하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 약 정보 검색하기 */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('PillSearch')}
        >
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
    flex: 1, // ScrollView가 전체 화면에 맞게 늘어남
    paddingHorizontal: '5%', // 좌우 여백 5%
    justifyContent: 'space-between', // 모든 요소 간격 조정
    backgroundColor: '#F8F8F8',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '1%', // 비율에 맞는 아래 여백
    textAlign: 'left',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%', // 내부 여백
    flex: 0.35,
    justifyContent: 'space-between', // 내부 정렬
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6E83B7',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: '3%',
  },
  infoText: {
    fontSize: 18,
    color: '#4B4B4B',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: 10,
    marginBottom: '3%',
    flex: 0.13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E83B7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    flex: 0.15, // 행이 화면의 15% 차지
  },
  smallCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '4%',
    marginHorizontal: '1.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginTop: '2%',
  },
  smallCardSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: '2%',
  },
});

export default HomeScreen;
