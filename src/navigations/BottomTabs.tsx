// src/navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Courses from "../screens/Course/Courses";
import Profile from "../screens/Profile/Profile";
import Posts from "../screens/Post/Posts";
import Exercises from "../screens/Exercise/Exercises";

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
          else if (route.name === "Profile")
            iconName = focused ? "settings" : "settings-outline";
          else if (route.name === "Posts")
            iconName = focused ? "newspaper" : "newspaper-outline";
          else if (route.name === "Exercises")
            iconName = focused ? "pencil" : "pencil-outline";
          else if (route.name === "Login")
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
        name="Exercises"
        component={Exercises}
        options={{ title: "Bài tập" }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{ title: "Khóa học", headerShown: false }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Cá nhân",
          headerShown: true,
          header: () => <ProfileHeader />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={SignUp}
        options={{ title: "Đăng nhập" }}
      />
    </Tab.Navigator>
  );
}
