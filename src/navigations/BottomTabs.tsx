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
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export type BottomTabParamList = {
  Homes: undefined;
  Courses: undefined;
  Profile: undefined;
  Posts: undefined;
  Exercises: undefined;
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

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgba(254, 149, 25, 1)",
        tabBarInactiveTintColor: "rgb(0, 0, 0)",
        tabBarStyle: {
          position: "absolute",
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
        options={{ title: "Khóa học" }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{ title: "Bài đăng" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Cá nhân",
          headerShown: true,
          header: ({ navigation }) => (
            <View style={styles.headerContainer}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginLeft: 10,
                }}
              >
                <FontAwesome6 name="coins" size={24} style={styles.coin} />=
                <Text style={styles.titlecoin}>500</Text>
              </View>
              <Text style={styles.headerTitle}>Cá nhân</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginRight: 10,
                }}
              >
                <AntDesign name="shoppingcart" size={24} style={styles.icon} />
                <Ionicons name="notifications" size={24} style={styles.icon} />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    height: 80,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },

  titlecoin: {
    color: "white",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  icon: {
    color: "white",
    marginTop: 20,
  },

  coin: {
    color: "rgb(243, 207, 5)",
    marginTop: 20,
  },
});
