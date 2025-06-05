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
  Pressable,
  Modal,
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
import { useTranslation } from "react-i18next";

import Octicons from "@expo/vector-icons/Octicons";

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Setting"
>;

const courses = [
  { id: "1", title: "Travel", image: "https://picsum.photos/200/300" },
];

const Setting = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [backgroundColor, setBackgroundColor] = useState("#008CBA");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const { t } = useTranslation();

  const onPressIn = () => {
    setBackgroundColor("#DDDDDD");
  };

  const onPressOut = () => {
    setBackgroundColor("#008CBA");
  };
  const navigateToAccInfo = (navigationName: keyof RootStackParamList) => {
    navigation.navigate("AccountInfomation");
  };

  const navigateToTersmofService = () => {
    navigation.navigate("TermsOfService");
  };

  const navigatetoPrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  const navigatetoAnotherSetting = () => {
    navigation.navigate("AnotherSetting");
  };

  const handleLogout = () => {
    console.log("Đăng xuất thành công");
    setShowLogoutModal(false);
  };

  const handleDelete = () => {
    console.log("Xóa tài khoản thành công");
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (showLogoutModal || showDeleteModal) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [showLogoutModal, showDeleteModal, scaleAnim]);
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
        <TouchableOpacity onPress={() => navigateToTersmofService()}>
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
        <TouchableOpacity onPress={navigatetoPrivacyPolicy}>
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
        <TouchableOpacity onPress={navigatetoAnotherSetting}>
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
                    {t("ANOTHER_SETTING")}
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
        <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
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
        <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
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
        <Modal
          transparent={true}
          visible={showLogoutModal}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Animated.View
              style={{
                width: "70%",
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
                transform: [{ scale: scaleAnim }],
              }}
            >
              <View
                style={{
                  backgroundColor: "#3E87F6",
                  padding: 10,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  marginBottom: 10,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Đăng xuất
                </Text>
              </View>
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 15, marginBottom: 20 }}>
                  Bạn có chắc chắn muốn đăng xuất?
                </Text>

                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Pressable
                    onPress={() => setShowLogoutModal(false)}
                    style={{
                      backgroundColor: "#ccc",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Hủy
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={handleLogout}
                    style={{
                      backgroundColor: "red",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Đăng xuất
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={showDeleteModal}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Animated.View
              style={{
                width: "70%",
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
                transform: [{ scale: scaleAnim }],
              }}
            >
              <View
                style={{
                  backgroundColor: "#f6d500",
                  padding: 10,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  marginBottom: 10,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
                >
                  Xóa tài khoản
                </Text>
              </View>
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 15, marginBottom: 20 }}>
                  Bạn có chắc chắn muốn xóa tài khoản này hay không?
                </Text>

                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Pressable
                    onPress={() => setShowDeleteModal(false)}
                    style={{
                      backgroundColor: "#ccc",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Hủy
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={handleDelete}
                    style={{
                      backgroundColor: "#f6d500",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Xóa
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Setting;
