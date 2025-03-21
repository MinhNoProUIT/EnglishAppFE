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
type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const courses = [
  { id: "1", title: "Travel", image: "https://picsum.photos/200/300" },
];

const Settings = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // Hook navigation

  const navigateToProfile = () => {
    navigation.navigate("Profile"); // Điều hướng đến màn hình Profile
  };
  useEffect(() => {
    // Giả lập tiến trình đang tải (mỗi giây tăng thêm 10%)
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
    <ScrollView className=" pt-3">
      <View className="bg-[#FFFAF0] p-6 rounded-lg m-3">
        <View className="flex-row justify-between">
          <View className=" relative flex-row items-center ">
            <Image
              style={{ borderWidth: 2, borderColor: "#2563EB" }}
              source={require("../../../assets/book_cartoon.jpg")}
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
            <Text className="text-sm mb-2 ml-1">
              {" "}
              Ho Chi Minh City, Vietnam
            </Text>
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
      </View>

      <View className="bg-[#FFFAF0] p-6 rounded-lg m-3">
        <Text className="font-bold mb-2" style={{ fontSize: 14 }}>
          Chúng ta đã đạt được
        </Text>
        <View
          className="mb-3 bg-[#FFFFFF] flex-row p-3 rounded-lg items-center border-2 "
          style={{ borderColor: "#e0e0e0" }}
        >
          <Image
            source={require("../../../assets/book_cartoon.jpg")}
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
            source={require("../../../assets/badge.png")}
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
            source={require("../../../assets/book_cartoon.jpg")}
            className="w-20 h-20 rounded-full"
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
    </ScrollView>
  );
};

export default Settings;
