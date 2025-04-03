// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

import SignUp from "../screens/Login/SignUp";
import SignIn from "../screens/Login/SignIn";

import PreviewWord from "../screens/Exercise/PreviewWord";
import PairWord from "../screens/Exercise/PairWord";
import GuessWord from "../screens/Exercise/GuessWord";
import RecallWord from "../screens/Exercise/RecallWord";
import WordsList from "../screens/Exercise/WordsList";

import Setting from "../screens/Profile/SettingComponent/Setting";
import Profile from "../screens/Profile/Profile";
import AccountInfomation from "../screens/Profile/AccInfoComponent/AccountInfomation";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ForgotPassword from "../screens/Login/ForgotPassword";
import ResetPassword from "../screens/Login/ResetPassword";
import ChangePassword from "../screens/Login/ChangePassword";

import TermsOfService from "../screens/Profile/TermsOfServiceComponent/TermsOfService";
import PrivacyPolicy from "../screens/Profile/PrivacyPolicyComponent/PrivacyPolicy";
import AnotherSetting from "../screens/Profile/AnotherSettingComponent/AnotherSetting";
//import UserDetails from "../screens/UserDetails";
import MyPost from './../screens/Post/MyPost';


export type RootStackParamList = {
  MainTabs: undefined;

  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  UserDetails: { userId: number };

  Setting: undefined;
  AccountInfomation: undefined;
  Profile: undefined;
  OnGoingCourses: undefined;
  CompletedCourses: undefined;

  PreviewWord: undefined;
  PairWord: undefined;
  GuessWord: undefined;
  RecallWord: undefined;
  WordsList: undefined;

  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  AnotherSetting: undefined;

  MyPost: undefined;
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

      {/* <Stack.Screen name="UserDetails" component={UserDetails} /> */}
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      <Stack.Screen
        name="PreviewWord"
        component={PreviewWord}
        options={{ title: "Preview it", headerShown: true }}
      />
      <Stack.Screen
        name="PairWord"
        component={PairWord}
        options={{ title: "Pair it", headerShown: true }}
      />
      <Stack.Screen
        name="GuessWord"
        component={GuessWord}
        options={{ title: "Guess it", headerShown: true }}
      />
      <Stack.Screen
        name="RecallWord"
        component={RecallWord}
        options={{ title: "Recall it", headerShown: true }}
      />
      <Stack.Screen
        name="WordsList"
        component={WordsList}
        options={{ title: "Vocabulary", headerShown: true }}
      />

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

      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Điều khoản dịch vụ</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Chính sách bảo mật</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="AnotherSetting"
        component={AnotherSetting}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cài đặt khác</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="MyPost" component={MyPost} options={{headerShown:true}}/>
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
