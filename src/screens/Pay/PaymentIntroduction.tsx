import { StackNavigationProp } from "@react-navigation/stack";
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
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
type PaymentIntroductionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentIntroduction"
>;

const PaymentIntroduction = () => {
  const navigation = useNavigation<PaymentIntroductionScreenNavigationProp>();
  const navigateToPaymentType = () => {
    navigation.navigate("PaymentType");
  };
  const navigateToPayment = () => {
    navigation.navigate("Payment");
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../../../assets/plus_illustration.png")}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 10,
            width: 100,
            backgroundColor: "#FE9519",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 5,
          }}
        >
          <Foundation name="crown" size={20} color="white" />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            PLUS
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Features</Text>
        </View>
      </View>
      <View style={{ marginTop: 20, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <FontAwesome6 name="hand" size={20} color="#FE9519" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: "black" }}>No </Text>
            <Text style={{ fontWeight: "bold" }}>ads</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <AntDesign name="unlock" size={20} color="#FE9519" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: "black" }}>Access to </Text>
            <Text style={{ fontWeight: "bold" }}>unlimited video lessons</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <FontAwesome6 name="hand" size={24} color="#FE9519" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ color: "black" }}>Access to </Text>
            <Text style={{ fontWeight: "bold" }}>premium courses! </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <FontAwesome6 name="hand" size={24} color="#FE9519" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>50% off </Text>
            <Text style={{ color: "black" }}>for third party courses</Text>
          </View>
        </View>
        <TouchableOpacity onPress={navigateToPayment}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              backgroundColor: "#2563EB",
              borderRadius: 15,
            }}
          >
            <View style={styles.planLeftSection}>
              <Text style={styles.planTitle}>1 Week</Text>
              <View style={styles.priceInfo}>
                <Text style={styles.originalPrice}>20,000 VND</Text>
                <Text style={styles.discountText}>50%</Text>
              </View>
            </View>

            <View style={styles.planRightSection}>
              <Text style={styles.price}>10,000 VND</Text>
              <Text style={styles.period}>/session</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPaymentType}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#2563EB",
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#2563EB", fontSize: 15, fontWeight: "bold" }}
            >
              All Plans
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  emptySpace: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  planCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  popularPlanCard: {},
  selectedPlan: {
    borderColor: "#3E87F6",
  },
  popularBadge: {
    backgroundColor: "#3E87F6",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  popularText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  planLeftSection: {},
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    color: "white",
    marginRight: 5,
  },
  discountText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  planRightSection: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  period: {
    fontSize: 14,
    color: "white",
  },
  infoContainer: {
    marginTop: 10,
    padding: 5,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
    marginTop: 6,
    marginRight: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#444444",
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    color: "#3E87F6",
    textDecorationLine: "underline",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  continueButton: {
    backgroundColor: "#3E87F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default PaymentIntroduction;
