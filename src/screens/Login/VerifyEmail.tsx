import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../navigations/AppNavigator";

type VerifyScreen = StackNavigationProp<
  RootStackParamList,
  "VerificationCodeScreen",
  "SignIn"
>;

const VerifyEmailScreen = () => {
  const navigation = useNavigation<VerifyScreen>();
  const handleVerify = () => {
    navigation.navigate("VerificationCodeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify email</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../png/verifyemail.png")} // hình bạn gửi
          style={styles.image}
        />

        <Text style={styles.heading}>Check your email</Text>
        <Text style={styles.subtext}>
          An email has just been sent to you.{"\n"}To access your account, you
          need to verify your email.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already verified your account?{" "}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("SignIn")}
        >
          LOGIN
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 280,
    height: 240,
    resizeMode: "contain",
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  loginText: {
    color: "#007bff",
    fontWeight: "600",
  },
});

export default VerifyEmailScreen;
