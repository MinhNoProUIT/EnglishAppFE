// src/navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Courses from "../screens/Course/Courses";
import Quizzes from "../screens/Quiz/Quizzes";
import Profile from "../screens/Profile/Profile";
import Posts from "../screens/Post/Posts";

import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HomeScreen from "../screens/Home/HomeScreen";

import SignUp from "../screens/Login/SignUp";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import ProfileHeader from "../components/headers/ProfileHeader";

export type BottomTabParamList = {
  Homes: undefined;
  Courses: undefined;
  Quizzes: undefined;
  Profile: undefined;
  Posts: { userId: number };
  Exercises: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Homes")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Courses")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Quizzes")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          else if (route.name === "Posts")
            iconName = focused ? "newspaper" : "newspaper-outline";
          else if (route.name === "Exercises")
            iconName = focused ? "pencil" : "pencil-outline";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgba(254, 149, 25, 1)",
        tabBarInactiveTintColor: "rgb(0, 0, 0)",
        tabBarStyle: {
          paddingBottom: 20,
          backgroundColor: "#fff",
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 75,
        },
      })}
    >
      <Tab.Screen
        name="Homes"
        component={HomeScreen}
        options={{ title: "Trang chủ", headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{ title: "Khóa học", headerShown: false }}
      />
      <Tab.Screen
        name="Quizzes"
        component={Quizzes}
        options={{ title: "Quiz", headerShown: false }}
      />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Cá nhân",
          headerShown: true,
          header: () => <ProfileHeader />,
        }}
      />
    </Tab.Navigator>
  );
}
