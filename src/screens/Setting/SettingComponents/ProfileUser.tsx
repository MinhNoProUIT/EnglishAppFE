import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations/AppNavigator";
type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileUser = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // Hook navigation
  const scale = new Animated.Value(0.8);
  useEffect(() => {
    // Tạo hiệu ứng lặp đi lặp lại
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2, // Phóng to lên 1.1
          duration: 1500, // Thời gian 1 giây
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.8, // Thu nhỏ về 0.9
          duration: 1500, // Thời gian 1 giây
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  const navigateToProfile = () => {
    navigation.navigate("Profile"); // Điều hướng đến màn hình Profile
  };
  return (
    <View className="bg-[#FFFAF0] p-6 rounded-lg m-3">
      <View className="flex-row justify-between">
        <View className=" relative flex-row items-center ">
          <Image
            style={{ borderWidth: 2, borderColor: "#2563EB" }}
            source={require("../../../../assets/book_cartoon.jpg")}
            className="w-32 h-32 rounded-full"
          />
          <TouchableOpacity className="bg-[#2563EB] rounded-full h-9 w-9 items-center justify-center absolute right-0.5 border-2 border-white bottom-1 ">
            <Ionicons name="pencil" size={15} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className=" rounded-lg h-9 w-9 items-center justify-center"
          onPress={navigateToProfile}
        >
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex">
        <View className="flex-row item-center ">
          <View className="rounded-full bg-[#FE9519] h-7 w-7  items-center justify-center">
            <Foundation name="crown" size={15} color="white" />
          </View>
          <Text className="text-lg font-bold mb-2 ml-3">Tran Van Minh</Text>
        </View>
        <View className="flex-row item-center">
          <Ionicons name="location-outline" size={20} color="black" />
          <Text className="text-sm mb-2 ml-1"> Ho Chi Minh City, Vietnam</Text>
        </View>
        <View className="flex-row item-center">
          <AntDesign name="book" size={20} color="black" />
          <Text className="text-sm mb-2 ml-1">
            {" "}
            Speak English at beginner level
          </Text>
        </View>
        <View className="flex-row item-center">
          <SimpleLineIcons name="book-open" size={20} color="black" />
          <Text className="text-sm mb-1 ml-1">
            {" "}
            Learning English and Turkish
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 12,
          borderWidth: 2,
          borderColor: "#FFA500",
          borderRadius: 5,
          padding: 15,
          backgroundColor: "rgb(255, 232, 208)",
        }}
      >
        <View style={{ width: 210, gap: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FFA500",
              fontSize: 18,
            }}
          >
            EnglishApp Premium
          </Text>
          <Text>
            Tài khoản bạn còn 15 MochiCoin, hãy tiếp tục mua thêm để mở khóa
            khóa học bạn nhé!!!
          </Text>

          <Animated.View
            style={{
              transform: [{ scale }], // Áp dụng hiệu ứng phóng to/thu nhỏ
              marginLeft: 10,
              width: 100,
              height: 30,
              borderRadius: 5,
              borderColor: "rgb(255, 145, 0)",
              borderWidth: 1,
              backgroundColor: "#FFA500",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Mua ngay
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View>
          <Image
            source={require("../../../../assets/EnglishAppPremium.png")}
            className="w-32 h-32 rounded-full"
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileUser;
