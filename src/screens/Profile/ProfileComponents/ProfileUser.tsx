import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations/AppNavigator";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useGetByIdQuery } from "../../../services/userService";
type ProfilesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const days = [
  { label: "T2", key: "mon" },
  { label: "T3", key: "tue" },
  { label: "T4", key: "wed" },
  { label: "T5", key: "thu" },
  { label: "T6", key: "fri" },
  { label: "T7", key: "sat" },
  { label: "CN", key: "sun" },
];

// Helper để lấy thứ trong tuần của JS (0 = CN, 1 = T2, ...)
const getTodayKey = () => {
  const jsDay = new Date().getDay(); // 0 - CN, 1 - T2 ...
  // map JS day sang key của days:
  switch (jsDay) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    case 6:
      return "sat";
    default:
      return undefined;
  }
};

const ProfileUser = () => {
  const navigation = useNavigation<ProfilesScreenNavigationProp>(); // Hook navigation
  const scale = new Animated.Value(0.8);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const [checkedDays, setCheckedDays] = useState<{ [key: string]: boolean }>(
    {}
  );

  const todayKey = getTodayKey();

  const onCheckIn = () => {
    if (!todayKey) {
      // Xử lý trường hợp không xác định được ngày, hoặc return
      return;
    }
    if (!checkedDays[todayKey]) {
      setCheckedDays((prev) => ({ ...prev, [todayKey]: true }));
    }
  };

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
    navigation.navigate("Setting"); // Điều hướng đến màn hình Setting
  };

  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { data } = useGetByIdQuery();

  useEffect(() => {
    if (data) {
      setAddress(data.address);
      setFullname(data.fullname);
      setImageUrl(data.image_url);
    }
  }, [data]);
  return (
    <View className="bg-[#FFFAF0] p-6 rounded-lg m-3">
      <View className="flex-row justify-between">
        <View className=" relative flex-row items-center ">
          <Image
            style={{ borderWidth: 2, borderColor: "#2563EB" }}
            source={{ uri: imageUrl }}
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
          <View className="rounded-full bg-[#3E87F6] h-7 w-7  items-center justify-center">
            <Foundation name="crown" size={15} color="white" />
          </View>
          <Text className="text-lg font-bold mb-2 ml-3">{fullname}</Text>
        </View>
        <View className="flex-row item-center">
          <Ionicons name="location-outline" size={20} color="black" />
          <Text className="text-sm mb-2 ml-1">{address}</Text>
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
          borderColor: "#3E87F6",
          borderWidth: 2,
          borderRadius: 5,
          padding: 20,
          marginTop: 12,
          backgroundColor: "rgb(255, 232, 208)",
        }}
      >
        <View style={styles.container}>
          <View style={styles.daysRow}>
            {days.map((day) => {
              const checked = !!checkedDays[day.key];
              return (
                <View
                  key={day.key}
                  style={[
                    styles.circle,
                    checked ? styles.checkedCircle : styles.uncheckedCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      checked ? styles.checkedText : styles.uncheckedText,
                    ]}
                  >
                    {day.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6 name="gift" size={30} color="#3E87F6" />
            <View
              style={{
                marginLeft: 10,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 10,
                }}
              >
                Điểm danh mỗi ngày
              </Text>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <FontAwesome5 name="coins" size={15} color="rgb(243,207,0)" />
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#3E87F6",
                    fontSize: 10,
                  }}
                >
                  5
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onCheckIn}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Nhận</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 12,
          borderWidth: 2,
          borderColor: "#3E87F6",
          borderRadius: 5,
          padding: 15,
          backgroundColor: "rgb(255, 232, 208)",
        }}
      >
        <View style={{ width: 210, gap: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#3E87F6",
              fontSize: 18,
            }}
          >
            EnglishApp Premium
          </Text>
          <Text>
            Tài khoản bạn còn 15 MochiCoin, hãy tiếp tục mua thêm để mở khóa
            khóa học bạn nhé!!!
          </Text>

          <TouchableOpacity
            style={{
              width: 100,
              height: 30,
              borderRadius: 5,
              borderColor: "#3E87F6",
              borderWidth: 1,
              backgroundColor: "#3E87F6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Mua ngay</Text>
          </TouchableOpacity>
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

const CIRCLE_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 350,
    marginBottom: 10,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCircle: {
    backgroundColor: "#3E87F6", // xanh
    borderColor: "#3E87F6",
  },
  uncheckedCircle: {
    backgroundColor: "white",
    borderColor: "#3E87F6",
  },
  dayText: {
    fontWeight: "bold",
  },
  checkedText: {
    color: "white",
  },
  uncheckedText: {
    color: "#3E87F6",
  },
  button: {
    backgroundColor: "#3E87F6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ProfileUser;
