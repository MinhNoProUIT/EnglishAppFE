import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import ProfileUser from "./SettingComponents/ProfileUser";
import Achievement from "./SettingComponents/Achievement";
type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Settings = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className=" pt-3" contentContainerStyle={{ paddingBottom: 90 }}>
      <ProfileUser />
      <Achievement />
    </ScrollView>
  );
};

export default Settings;
