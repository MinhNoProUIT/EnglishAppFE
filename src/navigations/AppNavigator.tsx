// src/navigation/AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

import SignUp from "../screens/Login/SignUp";
import SignIn from "../screens/Login/SignIn";

import LearnScreen from "../screens/Exercise/LearnScreen";
import PracticeScreen from "../screens/Exercise/PracticeScreen";
import WordsList from "../screens/Exercise/WordsList";
import { QuizResult, Quiz, QuizQuestion } from "../interfaces/QuizInterface";
import CreateEditQuiz from "../screens/Quiz/CreateEditQuiz";
import PreviewQuiz from "../screens/Quiz/PreviewQuiz";
import DoQuiz from "../screens/Quiz/DoQuiz";
import FinishQuiz from "../screens/Quiz/FinishQuiz";
import ReviewFinishQuizResult from "../screens/Quiz/ReviewFinishQuiz";

import Setting from "../screens/Profile/SettingComponent/Setting";
import Profile from "../screens/Profile/Profile";
import AccountInfomation from "../screens/Profile/AccInfoComponent/AccountInfomation";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ForgotPassword from "../screens/Login/ForgotPassword";
import ResetPassword from "../screens/Login/ResetPassword";
import ChangePassword from "../screens/Login/ChangePassword";

import TermsOfService from "../screens/Profile/TermsOfServiceComponent/TermsOfService";
import PrivacyPolicy from "../screens/Profile/PrivacyPolicyComponent/PrivacyPolicy";
import AnotherSetting from "../screens/Profile/AnotherSettingComponent/AnotherSetting";

import AccountCreatedScreen from "../screens/Login/AccountCreated";
import OnboardingScreen from "../screens/Welcome/OnboardingScreen";

//import UserDetails from "../screens/UserDetails";

import MyPost from "./../screens/Post/MyPost";
import VerificationCodeScreen from "../screens/Login/Verify";
import VerifyEmailScreen from "../screens/Login/VerifyEmail";

import PaymentType from "../screens/Pay/PaymentType";
//import UserDetails from "../screens/UserDetails";
import Payment from "../screens/Pay/Payment";
import PaymentIntroduction from "../screens/Pay/PaymentIntroduction";
import GroupList from "../screens/Group/GroupList";
import Chat from "../screens/Group/Chat";
import PaymentSuccessful from "../screens/Pay/PaymentSuccessful";
import UpdateInfo from "../screens/Profile/UpdateInfoComponent/UpdateInfo";
import { useTranslation } from "react-i18next";
import ChangePasswordScreen from "../screens/Login/ChangePasswordScreen";
import { Linking } from "react-native"; // Thêm Linking từ React Native để nhận deep link
import { NavigationContainer } from "@react-navigation/native";

import { ICreatePaymentResponse } from "../services/paymentService";

export type RootStackParamList = {
  MainTabs: undefined;

  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  AccountCreatedScreen: undefined;
  VerificationCodeScreen: undefined;
  VerifyEmailScreen: undefined;
  UserDetails: { userId: number };

  Setting: undefined;
  AccountInfomation: undefined;
  Profile: undefined;

  Courses: undefined;
  LearnScreen: { course_id: string, onFinish: () => void };
  PracticeScreen: { course_id: string, toCheckCompleted: boolean, onFinish: () => void };
  WordsList: { course_id: string };

  CreateEditQuiz:
    | { quizToEdit?: Quiz; quizQuestionsToEdit?: QuizQuestion[] }
    | undefined;
  PreviewQuiz: { quizToPreview: Quiz };
  DoQuiz: { quizTitle: string; quizQuestions: QuizQuestion[] };
  FinishQuiz: { resultData: QuizResult };
  ReviewFinishQuizResult: { resultData: QuizResult };

  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  AnotherSetting: undefined;

  MyPost: { userId?: string | null; type?: string | null; username?: string | null};
  Posts: { userId?: string | null; type?: string | null; username?: string | null }; 

  Group: undefined;
  Chat: { groupId: string };

  PaymentType: undefined;
  ProfileHeader: undefined;
  Payment: {
    paymentData: ICreatePaymentResponse;
    amount: number;
    description: string;
  };
  PaymentIntroduction: undefined;

  PaymentSuccessful: {
    amount: number;
    paid_at: Date;
    orderCode: number;
    description: string;
  };

  Onboarding: undefined;
  UpdateInfo: undefined;
  ChangePasswordScreen: undefined;
  ResetPassword: { token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  initialRoute: keyof RootStackParamList;
}

export const linking = {
  prefixes: ["https://englishapp-uit.onrender.com"], // Thêm prefix chính xác (URL của bạn trên Render)
  config: {
    screens: {
      ForgotPassword: "auth/forgot-password", // Màn hình ForgotPassword
      ResetPassword: "auth/reset-password/:token", // Màn hình ResetPassword nhận token từ URL
      // Các màn hình khác như SignUp, SignIn, MainTabs có thể được thêm vào đây nếu cần
    },
  },
};

export default function AppNavigator({ initialRoute = "SignIn" }: Props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* <Stack.Screen name="UserDetails" component={UserDetails} /> */}
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="AccountCreatedScreen"
        component={AccountCreatedScreen}
      />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="VerificationCodeScreen"
        component={VerificationCodeScreen}
      />
      <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />

      <Stack.Screen name="LearnScreen" component={LearnScreen} />
      <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
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
      <Stack.Screen name="CreateEditQuiz" component={CreateEditQuiz} />
      <Stack.Screen name="PreviewQuiz" component={PreviewQuiz} />
      <Stack.Screen name="DoQuiz" component={DoQuiz} />
      <Stack.Screen name="FinishQuiz" component={FinishQuiz} />
      <Stack.Screen
        name="ReviewFinishQuizResult"
        component={ReviewFinishQuizResult}
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
              <TouchableOpacity
                onPress={() => navigation.navigate("UpdateInfo")}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t("UPDATE_INFO")}</Text>
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

      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t("CHANGE_PASSWORD")}</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Group"
        component={GroupList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PaymentSuccessful"
        component={PaymentSuccessful}
        options={{ headerShown: false }}
      />
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
