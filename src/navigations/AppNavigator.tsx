// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

import SignUp from "../screens/Login/SignUp";
import SignIn from "../screens/Login/SignIn";

import LearnByFlashcard from "../screens/Exercise/LearnByFlashcard";
import LearnByListenAndGuess from "../screens/Exercise/LearnByListenAndGuess";
import LearnByTranslate from "../screens/Exercise/LearnByTranslate";
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
import AntDesign from "@expo/vector-icons/AntDesign";

import ForgotPassword from "../screens/Login/ForgotPassword";
import ResetPassword from "../screens/Login/ResetPassword";
import ChangePassword from "../screens/Login/ChangePassword";

import TermsOfService from "../screens/Profile/TermsOfServiceComponent/TermsOfService";
import PrivacyPolicy from "../screens/Profile/PrivacyPolicyComponent/PrivacyPolicy";
import AnotherSetting from "../screens/Profile/AnotherSettingComponent/AnotherSetting";

import AccountCreatedScreen from "../screens/Login/AccountCreated";
import OnboardingScreen from "../screens/Welcome/OnboardingScreen";


//import UserDetails from "../screens/UserDetails";
import MyPost from './../screens/Post/MyPost';

import PaymentType from "../screens/Pay/PaymentType";
//import UserDetails from "../screens/UserDetails";
import Payment from "../screens/Pay/Payment";
import PaymentIntroduction from "../screens/Pay/PaymentIntroduction";

export type RootStackParamList = {
  MainTabs: undefined;

  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  AccountCreatedScreen: undefined;
  Onboarding: undefined;
  UserDetails: { userId: number };

  Setting: undefined;
  AccountInfomation: undefined;
  Profile: undefined;
  OnGoingCourses: undefined;
  CompletedCourses: undefined;

  LearnByFlashcard: undefined;
  LearnByListenAndGuess: undefined;
  LearnByTranslate: undefined;
  PreviewWord: undefined;
  PairWord: undefined;
  GuessWord: undefined;
  RecallWord: undefined;
  WordsList: undefined;

  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  AnotherSetting: undefined;


  MyPost: undefined;

  PaymentType: undefined;
  ProfileHeader: undefined;
  Payment: undefined;
  PaymentIntroduction: undefined;
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
      <Stack.Screen
        name="AccountCreatedScreen"
        component={AccountCreatedScreen}
      />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen
        name="LearnByFlashcard"
        component={LearnByFlashcard}
      />
      <Stack.Screen
        name="LearnByListenAndGuess"
        component={LearnByListenAndGuess}
      />
      <Stack.Screen
        name="LearnByTranslate"
        component={LearnByTranslate}
      />
      <Stack.Screen
        name="PreviewWord"
        component={PreviewWord}
        options={{ title: "Preview it", headerShown: true }}
      />
      <Stack.Screen
        name="PairWord"
        component={PairWord}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.exerciseHeader}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.exerciseHeaderTitle}>Pair it</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GuessWord"
        component={GuessWord}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.exerciseHeader}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.exerciseHeaderTitle}>Guess it</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="RecallWord"
        component={RecallWord}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.exerciseHeader}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.exerciseHeaderTitle}>Recall it</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="WordsList"
        component={WordsList}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.exerciseHeader}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.exerciseHeaderTitle}>Vocabulary</Text>
            </View>
          ),
        }}
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
        name="PaymentType"
        component={PaymentType}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cửa hàng</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="PaymentIntroduction"
        component={PaymentIntroduction}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Khóa học cao cấp</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Thanh toán</Text>
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
    backgroundColor: "#3E87F6",
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
  
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF991F",
    height: 90,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  exerciseHeaderTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 20,
  },
});
