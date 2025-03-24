// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import SignUp from "../screens/Login/SignUp";
import SignIn from "../screens/Login/SignIn";
//import UserDetails from "../screens/UserDetails";

export type RootStackParamList = {
  MainTabs: undefined;
  SignUp: undefined;
  SignIn: undefined;
  UserDetails: { userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      {/* <Stack.Screen name="UserDetails" component={UserDetails} /> */}
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
