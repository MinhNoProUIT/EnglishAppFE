import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Privacy policy</Text>
        <Text>{t("PRIVACY_POLICY")}</Text>
        <Text style={styles.paragraph}>{t("TEST")}</Text>

        <Text style={styles.sectionTitle}>This policy covers:</Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>
            • important information and who we are
          </Text>
          <Text style={styles.bulletPoint}>• the personal data we collect</Text>
          <Text style={styles.bulletPoint}>
            • how and why we collect and use your personal data
          </Text>
          <Text style={styles.bulletPoint}>
            • why we process your personal data
          </Text>
          <Text style={styles.bulletPoint}>
            • when and why we will disclose your personal data to the SpeakUp
            Group or other organisations
          </Text>
          <Text style={styles.bulletPoint}>• international transfers</Text>
          <Text style={styles.bulletPoint}>
            • the rights and choices you have when it comes to your personal
            data
          </Text>
          <Text style={styles.bulletPoint}>• why we use cookies</Text>
          <Text style={styles.bulletPoint}>
            • the steps we take to ensure your information is kept secure and
            confidential
          </Text>
          <Text style={styles.bulletPoint}>
            • how long we will hold your information for
          </Text>
          <Text style={styles.bulletPoint}>• your legal rights</Text>
        </View>

        <Text style={styles.sectionNumber}>
          1. IMPORTANT INFORMATION AND WHO WE ARE
        </Text>
        <Text style={styles.paragraph}>
          SpeakUp provides its service (the "Service") to you subject to the
          Terms of Service, and the following Privacy Policy. We may update this
          Privacy Policy from time to time. All changes will be posted on our
          website (the "Site"). You can review the most current version of the
          Privacy Policy at any time here www.SpeakUp.com/en/privacy.
          www.SpeakUP.com/en/privacy) Your continued use of the Service or the
          Site after any such changes have been made constitutes your acceptance
          of the new Privacy Policy. This website is not intended for children
          and we do not knowingly collect data relating to children. Words
          beginning with capital letters in this Privacy Policy which are not
          defined in this Privacy Policy are defined in the Terms of Service.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  headerRight: {
    width: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333333",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  bulletPointContainer: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333333",
    marginBottom: 6,
  },
  sectionNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default PrivacyPolicyScreen;
