// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Setting from "../screens/Profile/SettingComponent/Setting";
import Profile from "../screens/Profile/Profile";
import AccountInfomation from "../screens/Profile/AccInfoComponent/AccountInfomation";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
//import UserDetails from "../screens/UserDetails";

export type RootStackParamList = {
  MainTabs: undefined;
  Setting: undefined;
  AccountInfomation: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cài đặt</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="AccountInfomation"
        component={AccountInfomation}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    height: 50,
    paddingHorizontal: 10,
    marginTop: 40,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginRight: 20,
  },
});
