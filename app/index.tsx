import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../src/screen/RegisterScreen';
import LoginScreen from '../src/screen/LoginScreen';
import HomeScreen from '../src/screen/HomeScreen';

type User = {
  id: string;
  userName: string;
  balance: number;
};

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: { user: User };
};

const Stack = createStackNavigator<RootStackParamList>();

const Page: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Page;