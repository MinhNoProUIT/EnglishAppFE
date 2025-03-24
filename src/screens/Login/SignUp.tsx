import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StackNavigationState, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";

type SignInScreen = StackNavigationProp<RootStackParamList, "SignIn">;

export default function SignUp() {
  const navigation = useNavigation<SignInScreen>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    socialButton: {
      backgroundColor: "#e9effd",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 12,
      marginTop: 12,
      justifyContent: "center",
      paddingVertical: 12,
      paddingLeft: 18,
      paddingRight: 24,
      borderRadius: 8,
    },
    socialText: { marginLeft: 10, fontSize: 16 },
    orText: {
      marginBottom: 16,
      marginTop: 28.5,
      textAlign: "center",
    },
    input: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
    text_input: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#2563ea",
      borderRadius: 8,
      paddingVertical: 12,
      paddingLeft: 18,
      paddingRight: 24,
      marginHorizontal: 12,
      marginTop: 12.5,
    },
    button_create: {
      borderRadius: 8,
      backgroundColor: "#007bff",
      marginTop: 10,
      marginHorizontal: 12,
      paddingHorizontal: 26,
      paddingVertical: 12,
      alignItems: "center",
    },
    text_button_create: { textAlign: "center", fontSize: 18, color: "white" },
    policyText: {
      textAlign: "center",
      padding: 16,
      marginHorizontal: 10,
      fontSize: 16,
    },
    bottomContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 50,
    },
    loginText: {
      textAlign: "center",
      fontSize: 14,
      color: "#000",
    },
    loginLink: {
      color: "#007bff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to EnglishApp</Text>
            <View>
              <TouchableOpacity style={styles.socialButton}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="logo-google"
                    size={20}
                    color={"red"}
                  ></Ionicons>
                </View>
                <Text style={styles.socialText}>Sign up with Google</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.socialButton}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="logo-facebook"
                    size={20}
                    color={"#1877F2"}
                  ></Ionicons>
                </View>
                <Text style={styles.socialText}>Sign up with Facebook</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.orText}>OR</Text>

            <View>
              <View style={styles.text_input}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color={"black"}
                ></MaterialIcons>
                <TextInput
                  style={styles.input}
                  placeholder="Fullname"
                ></TextInput>
              </View>
              <View style={styles.text_input}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color={"black"}
                ></MaterialIcons>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                ></TextInput>
              </View>
              <View style={styles.text_input}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={"black"}
                ></MaterialIcons>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                ></TextInput>
              </View>
              <TouchableOpacity style={styles.button_create}>
                <Text style={styles.text_button_create}>Create an account</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.policyText}>
              By create an account you agree to our Terms of Service and Privacy
              Policy
            </Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.loginText}>Already got an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.loginLink}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
