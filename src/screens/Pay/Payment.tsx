import React, { useEffect, useRef, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatCurrency } from "../../utils/formatCurrentcy";
import QRCode from "react-native-qrcode-svg";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCheckOrderStatusQuery } from "../../services/paymentService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Payment"
>;

const qrInfo = {
  bankId: "MB",
  accountNo: "0843166357",
  amount: "100000",
  description: "1011000083",
};
let isSuccess = false;

type CheckPairResult = { check: boolean; lastPair: any } | false;

async function checkPair(
  amount: number,
  description: string
): Promise<CheckPairResult> {
  if (isSuccess) return false;

  try {
    const response = await fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjhtaWi3L5xYnDMzVO-qL7W_swKxBQv1Ek7-4KyBkaYrwy6AuUA01-DXjFbboRpgLW_7MoHWabjk-JwPoRFb276YbO5TNTpG79v91shDudXgnbWdWgoyv49NIWHR_lFLELajWVUl5jt5ohQY-Ci9iqF9OjSBMh8X9D4uEaaRD2vy_4Oxyq8Asc8r333wctULWvbo1wPSyFKczeqUScXwpp-Ui9KsoT4GlgeZPjpeHPOCZIf-44VMPlc30zwb5CT34SorKIGwXdx-oIJuDXbzS0vq6t8GWdmM9FdWPg8&lib=MegoFG1GBylzG7hkrwht9DYizfO9FnT2K"
    );

    const data = await response.json();
    const lastPair = data?.data?.[data.data.length - 1];
    const lastAmount = Number(lastPair?.["Giá trị"]);
    const lastDescription = lastPair?.["Mô tả"] || "";
    console.log("lastAmount", lastAmount);
    console.log("lastDescription", lastDescription);
    console.log("description", description);
    console.log("lastPair", lastPair);

    if (
      !isNaN(lastAmount) &&
      lastAmount >= amount &&
      lastDescription.includes(description)
    ) {
      console.log("Thanh toan thanh cong");
      isSuccess = true;
      return { check: true, lastPair: lastPair };
    }
  } catch (err) {
    console.error("Error in checkPair:", err);
  }

  return {
    check: false,
    lastPair: null,
  };
}

const Payment = () => {
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "Payment">>();
  const { amount, description, userId } = route.params;
  const first8Chars = userId?.slice(0, 8);
  const updatedDescription = first8Chars + description;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("updatedDescription: ", updatedDescription);

    // Gọi ngay lần đầu
    checkPair(amount, updatedDescription).then((result) => {
      if (result && result.check) {
        setIsChecking(false);
        if (intervalRef.current) clearInterval(intervalRef.current);

        navigation.navigate("PaymentSuccessful", {
          amount,
          paid_at: result.lastPair?.["Ngày diễn ra"], // Giả sử bạn muốn lấy thời gian hiện tại
          orderCode: result.lastPair?.["Mã GD"],
          updatedDescription,
        });
      }
    });

    // Thiết lập interval kiểm tra mỗi 3 giây
    intervalRef.current = setInterval(async () => {
      const success = await checkPair(amount, updatedDescription);
      if (success && success.check && intervalRef.current) {
        clearInterval(intervalRef.current);
        setIsChecking(false);
        clearInterval(intervalRef.current);

        navigation.navigate("PaymentSuccessful", {
          amount,
          paid_at: success.lastPair?.["Ngày diễn ra"], // Giả sử bạn muốn lấy thời gian hiện tại
          orderCode: success.lastPair?.["Mã GD"],
          updatedDescription,
        });
        isSuccess = false;
      }
    }, 3000);

    // Cleanup khi unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        isSuccess = false;
      }
    };
  }, [amount, description, userId]);

  return (
    <ScrollView style={{ backgroundColor: "rgb(255, 255, 255)" }}>
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
          }}
        >
          {/* <QRCode
            value={paymentData.Data?.qrCode} // qrCode là chuỗi QR mà bạn nhận từ API
            size={200}
            color="black"
            backgroundColor="white"
          /> */}
          <Image
            style={{ width: 280, height: 280 }}
            source={{
              uri: `https://img.vietqr.io/image/${qrInfo.bankId}-${qrInfo.accountNo}-compact.png?amount=${amount}&addInfo=${updatedDescription}`,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 15,
            marginTop: 20,
          }}
        >
          <TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["rgb(66, 226, 238)", "rgb(17, 243, 17)"]}
              style={{
                flexDirection: "row",
                height: 30,
                alignItems: "center",
                backgroundColor: "green",
                width: "50%",
                borderRadius: 10,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <MaterialIcons name="cloud-download" size={24} color="black" />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#31473A",
                  }}
                >
                  Tải ảnh ngay!!!
                </Text>
              </View>
              <MaterialIcons name="cloud-download" size={24} color="black" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 15,
            marginTop: 20,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#EDF4F2", "#EDF4F2"]}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 12,
              height: 70,
              alignItems: "center",
              backgroundColor: "green",
              width: "80%",
              borderRadius: 15,
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
              <Text style={{ color: "#31473A" }}>Ngân hàng</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{
                    uri: `https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-MB-Bank-MBB.png`,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#31473A" }}
                >
                  MB Bank
                </Text>
              </View>
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
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#EDF4F2", "#EDF4F2"]}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 12,
              height: 70,
              alignItems: "center",
              backgroundColor: "green",
              width: "80%",
              borderRadius: 15,
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
              <Text style={{ color: "#31473A" }}>Số tài khoản</Text>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#31473A" }}
              >
                0843166357
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
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#EDF4F2", "#EDF4F2"]}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 12,
              height: 70,
              alignItems: "center",
              backgroundColor: "green",
              width: "80%",
              borderRadius: 15,
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
              <Text style={{ color: "#31473A" }}>Số tiền</Text>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#31473A" }}
              >
                {formatCurrency(amount)}
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
          </LinearGradient>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#EDF4F2", "#EDF4F5"]}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 12,
              height: 70,
              alignItems: "center",
              backgroundColor: "green",
              width: "80%",
              borderRadius: 15,
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
              <Text style={{ color: "#31473A" }}>Lời nhắn/ Nội dung</Text>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#31473A" }}
              >
                {updatedDescription}
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
          </LinearGradient>
        </View>
        <View style={{ marginTop: 20, marginLeft: 10 }}>
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

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
export default Payment;
