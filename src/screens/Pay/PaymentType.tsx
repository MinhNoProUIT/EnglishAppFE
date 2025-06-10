import { StackNavigationProp } from "@react-navigation/stack";
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
} from "react-native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { IGetAllPremiumPackage } from "../../services/PremiumPackageService";
import { useGetAllPremiumPackageQuery } from "../../services/PremiumPackageService";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formatCurrentcy";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentTypeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentType"
>;
const PaymentType = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState("1week");
  const [selectedPrice, setSelectedPrice] = useState(10000);
  const navigation = useNavigation<PaymentTypeScreenNavigationProp>();

  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  const navigateToPayment = async (amount: number, description: string) => {
    try {
      navigation.navigate("Payment", {
        amount: amount,
        description: description,
        userId: userId,
      });
    } catch (err) {
      console.error("Error creating payment:", err);
    }
  };

  const {
    data: premiumPackageResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllPremiumPackageQuery();

  const premiumPackageData =
    (premiumPackageResponse?.Data as IGetAllPremiumPackage[]) || [];
  useEffect(() => {
    if (premiumPackageResponse) {
      console.log("📦 attendanceResponse:", premiumPackageResponse);
      console.log("✅ attendancetData:", premiumPackageData);
    } else console.log("kh lay dc");
  }, [premiumPackageResponse]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Plans */}
          {premiumPackageData.map((premiumPackage, index) => (
            <TouchableOpacity
              key={premiumPackage.name}
              style={[
                styles.planCard,
                selectedPlan === premiumPackage.name && styles.selectedPlan,
                premiumPackage.id === "3months" && styles.popularPlanCard,
              ]}
              onPress={() => {
                setSelectedPlan(premiumPackage.name),
                  setSelectedPrice(premiumPackage.price);
              }}
              activeOpacity={0.9}
            >
              {/* {plan.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )} */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                }}
              >
                <View style={styles.planLeftSection}>
                  <Text style={styles.planTitle}>
                    {t(`${premiumPackage.name}`)}
                  </Text>
                  <View style={styles.priceInfo}>
                    <Text style={styles.originalPrice}>
                      {formatCurrency(premiumPackage.original_price)}
                    </Text>
                    <Text style={styles.discountText}>
                      {premiumPackage.discount}
                    </Text>
                  </View>
                </View>

                <View style={styles.planRightSection}>
                  <Text style={styles.price}>
                    {formatCurrency(premiumPackage.price)}
                  </Text>
                  <Text style={styles.period}>{t("PERIOD")}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Additional info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.infoText}>
                SpeakUp subscription will let you access to some parts of
                premium features and content.
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.infoText}>
                You can manage them on the Play Store or App Store. Read more
                about <Text style={styles.linkText}>term and condition</Text>{" "}
                <Text>.</Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigateToPayment(selectedPrice, selectedPlan)}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    flexDirection: "column", // Updated to column
    justifyContent: "flex-start", // Ensures vertical alignment
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
    // Space between the badge and the rest of the content
  },
  popularText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  planLeftSection: {
    //paddingLeft: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 5,
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    color: "#666666",
    marginRight: 5,
  },
  discountText: {
    fontSize: 14,
    color: "#3E87F6",
    fontWeight: "bold",
  },
  planRightSection: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  period: {
    fontSize: 14,
    color: "#666666",
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

export default PaymentType;
