// src/components/headers/ProfileHeader.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  useGetCurrentCoinQuery,
  userCoinApi,
  useUpdateTotalCoinMutation,
} from "../../services/userCoinService";
import { useDispatch } from "react-redux";

type ProfileHeadersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileHeader"
>;

export default function ProfileHeader() {
  const { data, error, isLoading } = useGetCurrentCoinQuery();
  const coins = data?.Data;
  const dispatch = useDispatch();

  const [updateTotalCoin] = useUpdateTotalCoinMutation(); // Mutation để cập nhật coin

  const navigation = useNavigation<ProfileHeadersScreenNavigationProp>(); // Hook navigation
  const navigateToPaymentIntroduction = () => {
    navigation.navigate("PaymentIntroduction"); // Điều hướng đến màn hình Setting
  };

  const handleCoinUpdate = async (coinChange: number) => {
    try {
      // Gọi API để cập nhật coin
      await updateTotalCoin({ coinChange }).unwrap();

      // Sau khi cập nhật thành công, tự động cập nhật dữ liệu trong cache
      dispatch(
        userCoinApi.util.invalidateTags([{ type: "UserCoin", id: "LIST" }])
      );
    } catch (err) {
      console.error("Error updating coin:", err);
    }
  };
  if (isLoading) return null;
  console.log("coins", coins);
  console.log("coins", data);

  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: "row", gap: 10, marginLeft: 20 }}>
        <TouchableOpacity onPress={() => handleCoinUpdate(-5)}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome6 name="coins" size={24} style={styles.coin} />
          </View>
        </TouchableOpacity>
        <Text style={styles.titlecoin}>{coins}</Text>
      </View>
      <Text style={styles.headerTitle}>Cá nhân</Text>
      <View style={{ flexDirection: "row", gap: 10, marginRight: 20 }}>
        <TouchableOpacity onPress={navigateToPaymentIntroduction}>
          <AntDesign name="shoppingcart" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Ionicons name="notifications" size={24} color={"white"} />

            <View
              style={{
                backgroundColor: "red",
                borderRadius: 180,
                width: 15,
                height: 15,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -12, // tuỳ chỉnh vị trí so với icon
                marginTop: -3,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                99
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3E87F6",
    height: 80,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  titlecoin: {
    color: "white",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    color: "white",
    marginTop: 20,
  },
  coin: {
    color: "rgb(243, 207, 5)",
    marginTop: 20,
  },
  plus: {
    color: "white",
    marginTop: 20,
  },
});
