import React from 'react';
import JoinScreen from "../screens/JoinScreen.tsx";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
    Join: undefined;
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Join">
            <Stack.Screen name="Join" component={JoinScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default RootStack;
