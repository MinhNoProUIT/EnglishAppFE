import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatCurrency } from "../../utils/formatCurrentcy";
import QRCode from "react-native-qrcode-svg";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useGetAllPaymentQuery } from "../../services/paymentService";
import { IGetAllPayment } from "../../models/Payment";

import { useGetAllUserQuery } from "../../services/attendanceService";
import { IGetAllAttendance } from "../../models/Attendance";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useCreatePaymentMutation } from "../../services/paymentService";
import { StackNavigationProp } from "@react-navigation/stack";

const screenHeight = Dimensions.get("window").height;

async function Create() {}

type PaymentSuccessfulScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentSuccessful"
>;

const PaymentSuccessful = ({
  route,
}: {
  route: RouteProp<RootStackParamList, "PaymentSuccessful">;
}) => {
  const navigation = useNavigation<PaymentSuccessfulScreenNavigationProp>();

  const { amount, paid_at, orderCode, updatedDescription } = route.params;
  const {
    data: attendanceResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUserQuery();

  const [createPayment, { error, data }] = useCreatePaymentMutation();

  const handleCreatePayment = async () => {
    try {
      console.log("amount", amount);
      console.log("orderCode", orderCode);

      console.log("updatedDescription", updatedDescription);

      // Gọi API để tạo thanh toán
      const paymentData = await createPayment({
        amount,
        orderCode: orderCode.toString(),
        description: updatedDescription,
      }).unwrap();

      console.log("Payment created successfully:", paymentData);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };
  const attendancetData =
    (attendanceResponse?.Data as IGetAllAttendance[]) || [];
  // const getAccessToken = async() => {
  //   const savedToken = await AsyncStorage.getItem("authToken");
  // return savedToken
  // }
  useEffect(() => {
    if (attendanceResponse) {
      console.log("📦 attendanceResponse:", attendanceResponse);
      console.log("✅ attendancetData:", attendancetData);
    } else console.log("kh lay dc");
    handleCreatePayment();
  }, [attendanceResponse]);
  return (
    <View
      style={{
        backgroundColor: "rgb(173, 170, 170)",
        padding: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: 15,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: (screenHeight / 10) * 3,
            width: "100%",
            borderColor: "black",
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/Logo_MB_new.png")}
            style={{ width: 100, height: 30, marginTop: 10 }}
          />
          <Image
            source={require("../../../assets/icon_payment_successful.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            CHUYỂN KHOẢN THÀNH CÔNG
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 10,
              color: "#00c500",
            }}
          >
            {formatCurrency(amount)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 5,
              color: "rgb(173, 170, 170)",
            }}
          >
            {paid_at}
          </Text>
        </View>
        <View
          style={{
            height: (screenHeight / 10) * 4.5,
            width: "100%",
            borderColor: "black",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "gray",
              height: 60,
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>Tên người thụ hưởng</Text>
            <View style={{ width: "45%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                TRẦN VĂN MINH
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "gray",
              height: 60,
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>Tài khoản thụ hưởng</Text>
            <View style={{ width: "45%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                0843166357
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "gray",
              height: 60,
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>Mã giao dịch</Text>
            <View style={{ width: "45%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {orderCode}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "gray",
              height: 60,
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 15 }}>Nội dung chuyển khoản</Text>
            <View style={{ width: "45%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {updatedDescription}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 30,
              marginTop: 30,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "gray",
                  padding: 5,
                  borderRadius: 10,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="camera" size={24} color="black" />
              </View>
              <Text style={{ fontSize: 15 }}>Lưu ảnh</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "gray",
                  padding: 5,
                  borderRadius: 10,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="camera" size={24} color="black" />
              </View>
              <Text style={{ fontSize: 15 }}>Báo cáo</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 15,
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["rgb(66, 226, 238)", "rgb(17, 243, 17)"]}
              style={{
                flexDirection: "row",
                height: 50,
                alignItems: "center",
                backgroundColor: "green",
                width: "80%",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <Entypo name="home" size={24} color="black" />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#31473A",
                  }}
                >
                  Hoàn thành giao dịch
                </Text>
              </View>
              <Entypo name="home" size={24} color="black" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PaymentSuccessful;
