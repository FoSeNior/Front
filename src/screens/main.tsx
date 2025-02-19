import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export type HomeList = {
  PillAlarm: undefined;
  HospitalAlarm: undefined;
  SearchPill: undefined;
  PillAlarmList: undefined;
  HospitalAlarmList: undefined;
};

const HomeScreen = () => {
  const userName = useSelector((state: RootState) => state.user.name);
  const userId = useSelector((state: RootState) => state.user.id);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation<NavigationProp<HomeList>>();

  const [pillAlarms, setPillAlarms] = useState([]);
  const [hospitalAlarms, setHospitalAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 오늘 날짜 (YYYY-MM-DD)
  const today = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  //TODO : env 이용
  const url = '';

  useEffect(() => {
    const fetchAlarms = async () => {
      setLoading(true);
      try {
        const [pillAlarmResponse, hospitalAlarmResponse] = await Promise.all([
          axios.get(`${url}/alarm/pill/day/${userId}/${today}`),
          axios.get(`${url}/alarm/hospital/day/${userId}/${today}`)
        ]);

        setPillAlarms(pillAlarmResponse.data.alarms || []);
        setHospitalAlarms(hospitalAlarmResponse.data.alarms || []);
      } catch (error) {
        console.error('🚨 Axios 요청 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
  }, [userId, today]);

  // ✅ 알람 표시 최적화 (useMemo)
  const pillAlarmText = useMemo(() => {
    if (pillAlarms.length === 0) return '예정된 복약 없음';
    const firstAlarm = pillAlarms[0];
    return `${firstAlarm.time} ${firstAlarm.info} ${
      pillAlarms.length > 1 ? `외 ${pillAlarms.length - 1}건` : ''
    } 복약 예정`;
  }, [pillAlarms]);

  const hospitalAlarmText = useMemo(() => {
    if (hospitalAlarms.length === 0) return '예정된 병원 방문 없음';
    const firstAlarm = hospitalAlarms[0];
    return `${firstAlarm.time} ${firstAlarm.hospitalName} 방문 예정 ${
      hospitalAlarms.length > 1 ? `외 ${hospitalAlarms.length - 1}건` : ''
    }`;
  }, [hospitalAlarms]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>안녕하세요, {userName}님!</Text>

        {/* 🔥 날짜 및 알람 표시 */}
        <View style={styles.card}>
          <Text style={styles.date}>{today} 화요일</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6E83B7" />
          ) : (
            <>
              <View style={styles.infoRow}>
                <Image source={require('../assets/pill.jpg')} style={styles.icon} />
                <Text style={styles.infoText}>{pillAlarmText}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Image source={require('../assets/hospital.jpg')} style={styles.icon} />
                <Text style={styles.infoText}>{hospitalAlarmText}</Text>
              </View>
            </>
          )}
        </View>

        {/* 🔹 내가 저장한 병원/약 */}
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/pill.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>내가 저장한 병원/약</Text>
        </TouchableOpacity>

        {/* 🔹 주변 병원 찾기 */}
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/hospital.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>주변 가까운 병원 알아보기</Text>
        </TouchableOpacity>

        {/* 🔹 알림 관리 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('PillAlarmList')}>
            <Image source={require('../assets/pill.jpg')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>복약 알림</Text>
            <Text style={styles.smallCardSubtitle}>복약 알림 추가/삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('HospitalAlarmList')}>
            <Image source={require('../assets/hospital.jpg')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>병원 방문 알림</Text>
            <Text style={styles.smallCardSubtitle}>병원 알림 추가/삭제하기</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 약 검색 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchPill')}>
          <Image source={require('../assets/search.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>약 정보 검색하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  container: { flexGrow: 1, paddingHorizontal: 20, backgroundColor: '#F8F8F8' },
  greeting: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  date: { fontSize: 22, fontWeight: 'bold', color: '#6E83B7', textAlign: 'center' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#E5E5E5', marginVertical: 10 },
  icon: { width: 24, height: 24, marginRight: 10 },
  infoText: { fontSize: 18, color: '#4B4B4B' },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#6E83B7' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  smallCard: { flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 15, marginHorizontal: 5, alignItems: 'center' },
  smallCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#4B4B4B' },
  smallCardSubtitle: { fontSize: 14, color: '#9E9E9E', textAlign: 'center' },
});

export default HomeScreen;
