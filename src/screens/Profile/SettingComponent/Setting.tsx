import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
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
import { RootStackParamList } from "../../../navigations/AppNavigator";

import Octicons from "@expo/vector-icons/Octicons";

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Setting"
>;

const courses = [
  { id: "1", title: "Travel", image: "https://picsum.photos/200/300" },
];

const Profile = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // Hook navigation
  const [backgroundColor, setBackgroundColor] = useState("#008CBA");

  // Hiệu ứng thay đổi màu nền khi nhấn
  const onPressIn = () => {
    setBackgroundColor("#DDDDDD"); // Thay đổi màu khi nhấn
  };

  const onPressOut = () => {
    setBackgroundColor("#008CBA"); // Quay lại màu ban đầu
  };
  const navigateToAccInfo = (navigationName: keyof RootStackParamList) => {
    navigation.navigate(navigationName); // Điều hướng đến màn hình Setting
  };

  return (
    <ScrollView>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
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
              source={require("../../../../assets/book_cartoon.jpg")}
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
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Tran Van Minh
          </Text>
          <Text style={{ fontSize: 12 }}>minh8dclv123@gmail.com</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigateToAccInfo("AccountInfomation")}
        >
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/infoPerson.jpg")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {" "}
                    Thông tin tài khoản
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(10, 179, 66)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/terms_of_service.jpg")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {" "}
                    Điều khoản dịch vụ
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(10, 179, 66)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/privacy_policy.jpg")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {" "}
                    Chính sách bảo mật
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(10, 179, 66)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/setting_blue.jpg")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {" "}
                    Cài đặt khác
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(10, 179, 66)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/logout.png")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    style={{ fontWeight: "bold", fontSize: 18, color: "red" }}
                  >
                    {" "}
                    Đăng xuất
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(255, 0, 0)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: "rgb(201, 192, 192)",
                  borderBottomWidth: 1,
                  padding: 15,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/trash.jpg")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    style={{ fontWeight: "bold", fontSize: 18, color: "red" }}
                  >
                    {" "}
                    Xóa tài khoản
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgb(255, 0, 0)"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
