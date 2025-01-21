import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';

const PillAlertScreen = () => {
  const [date, setDate] = useState(new Date());
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState('');
  const [note, setNote] = useState('');

  const handleAddAlert = () => {
    alert(
      `복약 알림 추가됨: ${date.toLocaleString()}, 약 정보: ${medicineInfo}`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.header}>복약 알림 추가하기</Text>
          {/* 날짜 선택 */}
          <View style={styles.section}>
            <Text style={styles.label}>복약 기간을 선택해주세요.</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setTimePickerVisible(true)}
            >
              <Text style={styles.dateText}>{date.toLocaleString()}</Text>
            </TouchableOpacity>
          </View>

          {/* 약 정보 입력 */}
          <View style={styles.section}>
            <Text style={styles.label}>약 정보를 입력해주세요.</Text>
            <TextInput
              style={styles.input}
              placeholder="예) 감기약 2알, 타이레놀 1알"
              value={medicineInfo}
              onChangeText={setMedicineInfo}
            />
          </View>

          {/* 메모 입력 */}
          <View style={styles.section}>
            <Text style={styles.label}>추가 메모</Text>
            <TextInput
              style={styles.textArea}
              placeholder="이곳을 눌러 입력해주세요."
              value={note}
              onChangeText={setNote}
              multiline
            />
          </View>

          {/* 완료 버튼 */}
          <TouchableOpacity style={styles.completeButton} onPress={handleAddAlert}>
            <Text style={styles.completeButtonText}>복약 알림 추가 완료하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 시간 선택 모달 */}
      {timePickerVisible && (
        <Modal
          visible={timePickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setTimePickerVisible(false)} // iOS용 뒤로가기 닫기
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DatePicker date={date} onDateChange={setDate} mode="datetime" />
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => setTimePickerVisible(false)}
              >
                <Text style={styles.completeButtonText}>선택하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6E83B7',
    marginBottom: 10,
  },
  dateButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  dateText: {
    fontSize: 16,
    color: '#4B4B4B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  completeButton: {
    backgroundColor: '#6E83B7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default PillAlertScreen;
