import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
const Payment = () => {
  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <View
          style={{
            width: 70,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#9d9d9d",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 5,
            gap: 3,
          }}
        >
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={20}
            color="black"
          />
          <Text style={{ fontWeight: "bold" }}>29: 54</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 220, height: 220 }}
            source={require("../../../assets/QR_Code_example.png")}
            resizeMode="contain"
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              borderBottomColor: "#bbbbbb",
              borderBottomWidth: 1,
              padding: 5,
              height: 70,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 5,
              }}
            >
              <Text style={{ color: "#9d9d9d" }}>Lời nhắn/ Nội dung</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                103380133
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#9d9d9d",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="copy1" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#bbbbbb",
              borderBottomWidth: 1,
              padding: 5,
              height: 70,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 5,
              }}
            >
              <Text style={{ color: "#9d9d9d" }}>Tên tài khoản</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Tao là Minh
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#9d9d9d",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="copy1" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#bbbbbb",
              borderBottomWidth: 1,
              padding: 5,
              height: 70,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 5,
              }}
            >
              <Text style={{ color: "#9d9d9d" }}>Số điện thoại</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                0123456789
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#9d9d9d",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="copy1" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",

              padding: 5,
              height: 70,
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 5,
              }}
            >
              <Text style={{ color: "#9d9d9d" }}>Số tiền</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                1,000,000 VND
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#9d9d9d",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="copy1" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Vui lòng chuyển tiền trong 30 phút.</Text>
          <Text>Sử dụng mã QR Code để thao tác nhanh chóng.</Text>
          <Text>Hoặc sử dụng nút copy để sao chép chính xác tài khoản.</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: "red" }}>
              Đảm bảo điền đúng Lời nhắn/Nội dung:{" "}
            </Text>
            <Text style={{ fontWeight: "bold" }}>103390111</Text>
            <Text style={{ color: "red" }}>
              để được cập nhật khóa học nhanh chóng.{" "}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Payment;
