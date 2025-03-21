// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Profile from "../screens/Setting/Profile";
//import UserDetails from "../screens/UserDetails";

export type RootStackParamList = {
  MainTabs: undefined;
  UserDetails: { userId: number };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: "Thông tin cá nhân", // Tiêu đề thanh header
          headerBackTitle: "Quay lại", // Tiêu đề cho nút quay lại
        }}
      />
      {/* <Stack.Screen name="UserDetails" component={UserDetails} /> */}
    </Stack.Navigator>
  );
}
