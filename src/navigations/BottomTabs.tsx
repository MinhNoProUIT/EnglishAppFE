// src/navigation/BottomTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Courses from "../screens/Course/Courses";
import Settings from "../screens/Setting/Settings";
import Posts from "../screens/Post/Posts";
import Exercises from "../screens/Exercise/Exercises";

import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import SignUp from "../screens/Login/SignUp";

export type BottomTabParamList = {
  Homes: undefined;
  Courses: undefined;
  Settings: undefined;
  Posts: undefined;
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
          else if (route.name === "Settings")
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
          position: "absolute",
          borderRadius: 15,
          margin: 10,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#007AFF",
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 55,
        },
      })}
    >
      <Tab.Screen
        name="Homes"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{ title: "Bài tập" }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{ title: "Khóa học" }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{ title: "Bài đăng" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Cài đặt" }}
      />
      <Tab.Screen
        name="Login"
        component={SignUp}
        options={{ title: "Đăng nhập" }}
      />
    </Tab.Navigator>
  );
}
