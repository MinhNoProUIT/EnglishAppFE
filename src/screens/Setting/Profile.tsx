import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";

import Octicons from "@expo/vector-icons/Octicons";

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const courses = [
  { id: "1", title: "Travel", image: "https://picsum.photos/200/300" },
];

const Profile = () => {
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
    <ScrollView className="">
      <View className=" rounded-lg ">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              style={{
                borderWidth: 2,
                borderColor: "#2563EB",
                width: 128,
                height: 128,
                borderRadius: 64,
              }}
              source={require("../../../assets/book_cartoon.jpg")}
            />

            {/* Nút TouchableOpacity */}
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0, // Điều chỉnh phần nút nằm ngoài ảnh
                right: 0, // Điều chỉnh phần nút nằm ngoài ảnh
                backgroundColor: "#2563EB",
                borderRadius: 50, // Để tạo nút tròn
                width: 36, // Chiều rộng của nút
                height: 36, // Chiều cao của nút
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "white",
              }}
            >
              <Ionicons name="pencil" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Tran Van Minh
          </Text>
          <Text style={{ fontSize: 12 }}>minh8dclv123@gmail.com</Text>
        </View>
        <View style={{ marginTop: 10, padding: 10 }}>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <Ionicons name="person-outline" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}> Country</Text>
            </View>

            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <AntDesign name="earth" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Native language
              </Text>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 18, color: "gray" }}>
              {" "}
              Persian
            </Text>
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <Feather name="book-open" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Learning language
              </Text>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 18, color: "gray" }}>
              {" "}
              English
            </Text>
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Notifications
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <MaterialIcons
                name="format-list-bulleted-add"
                size={20}
                color="black"
              />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Term of Service
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <FontAwesome6 name="check-circle" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Privacy policy
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <FontAwesome5 name="question-circle" size={20} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}> Help</Text>
            </View>

            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <Foundation name="crown" size={25} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Start Speak Up Plus Now!
              </Text>
            </View>
          </View>

          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <SimpleLineIcons name="logout" size={18} color="red" />
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "red" }}>
                {" "}
                Logout
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "rgb(122, 116, 116)",
              borderTopWidth: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 5,
                margin: 5,
              }}
            >
              <AntDesign name="delete" size={20} color="red" />
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "red" }}>
                {" "}
                Delete account
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
