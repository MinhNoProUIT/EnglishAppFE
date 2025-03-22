import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
const Achievement = () => {
  return (
    <View className="bg-[#FFFAF0] p-6 rounded-lg m-3">
      <Text className="font-bold mb-2" style={{ fontSize: 14 }}>
        Chúng ta đã đạt được
      </Text>
      <View
        className="mb-3 bg-[#FFFFFF] flex-row p-3 rounded-lg items-center border-2 "
        style={{ borderColor: "#e0e0e0" }}
      >
        <Image
          source={require("../../../../assets/book_cartoon.jpg")}
          className="w-20 h-20 rounded-full"
        />
        <View className="ml-5">
          <Text className="font-bold mb-1" style={{ fontSize: 14 }}>
            Sổ tay cấp độ 5
          </Text>
          <Text
            className="font-bold mb-1"
            style={{ fontSize: 14, color: "#FF8C00" }}
          >
            512 / 700 từ
          </Text>
          <Progress.Bar
            borderRadius={15}
            width={200}
            color="#FFA500" // Màu thanh tiến trình
            unfilledColor="#e0e0e0" // Màu phần chưa được điền đầy
            borderWidth={0} // Xóa đường viền của ProgressBar
            height={13}
            progress={0.5}
          />
        </View>
      </View>
      <View
        className="mb-3 bg-[#FFFFFF] flex-row p-3 rounded-lg items-center border-2 "
        style={{ borderColor: "#e0e0e0" }}
      >
        <Image
          source={require("../../../../assets/badge.png")}
          className="w-20 h-20 rounded-full"
        />
        <View className="ml-5">
          <Text className="font-bold mb-1" style={{ fontSize: 14 }}>
            Sổ trí nhớ cấp độ 5
          </Text>
          <Text
            className="font-bold mb-1"
            style={{ fontSize: 14, color: "#FF8C00" }}
          >
            512 / 700 từ
          </Text>
          <Progress.Bar
            borderRadius={15}
            width={200}
            color="#FFA500" // Màu thanh tiến trình
            unfilledColor="#e0e0e0" // Màu phần chưa được điền đầy
            borderWidth={0} // Xóa đường viền của ProgressBar
            height={13}
            progress={0.7}
          />
        </View>
      </View>
      <View
        className="mb-3 bg-[#FFFFFF] flex-row p-3 rounded-lg items-center border-2 "
        style={{ borderColor: "#e0e0e0" }}
      >
        <Image
          source={require("../../../../assets/plant_pot.jpg")}
          className="w-20 h-20 rounded-full"
          resizeMode="contain"
        />
        <View className="ml-5">
          <Text className="font-bold mb-1" style={{ fontSize: 14 }}>
            Bạn đã học tập chăm chỉ
          </Text>
          <Text
            className="font-bold mb-1"
            style={{ fontSize: 14, color: "#00FF50" }}
          >
            25 ngày liên tiếp
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Achievement;
