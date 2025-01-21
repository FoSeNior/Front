import React from 'react';
import { useSelector } from 'react-redux';
import Main from '../screens/main';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { RootState } from '../store/reducer';
import PillAlertScreen from '../screens/pillAlarm';

export type RootStackParamList = {
  Main: undefined;
  HospitalAlarm: undefined;
  PillAlarm: undefined;
  LogIn: undefined;
  SignUp: undefined;
  SearchPill: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AfterLogin = () => {
  return <Text>로그인 후 페이지</Text>;
};

const BeforeLogin = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Stack.Screen
        name="PillAlarm"
        component={PillAlertScreen}
        options={{ title: 'PillAlertScreen' }}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.name);
  //TODO : 함수명 바꿀 것
  return (
    <NavigationContainer>
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </NavigationContainer>
  );
};

export default RootStack;
