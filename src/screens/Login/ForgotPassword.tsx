import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
} from "react-native";
import ImageForgot from "../../svg/imageReset.svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ResetPasswordScreen = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;
export default function ForgotPassword() {
  const navigation = useNavigation<ResetPasswordScreen>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: "white",
      justifyContent: "center",
    },
    view_notify: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      paddingVertical: 14,
      paddingHorizontal: 24,
      backgroundColor: "#2563eb",
      borderRadius: 8,
      marginTop: 120,
    },
    view_image: {
      justifyContent: "center",
      alignItems: "center",
    },
    view_email: {
      flexDirection: "row",
      marginTop: 24,
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#2563eb",
    },
    input: { fontSize: 16, marginLeft: 8 },
    view_end: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 30,
    },
    button: {
      backgroundColor: "#2563eb",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,

      width: "100%",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
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
            <View style={styles.view_notify}>
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color="#39d98a"
              />
              <Text style={{ marginLeft: 10, color: "white" }}>
                An email has just been sent to you. You can use it to retrieve
                your password
              </Text>
            </View>
            <View style={styles.view_image}>
              <ImageForgot width={185.91} height={240}></ImageForgot>
            </View>
            <Text
              style={{
                marginTop: 33,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 31,
                fontFamily: "Nunito",
              }}
            >
              Don't worry
            </Text>
            <Text
              style={{
                marginTop: 3,
                paddingHorizontal: 42,
                textAlign: "center",
                color: "#7D8388",
              }}
            >
              Please enter the address associated with your account
            </Text>
            <View style={styles.view_email}>
              <MaterialIcons
                name="email"
                size={20}
                color={"black"}
              ></MaterialIcons>
              <TextInput
                style={[styles.input, { marginRight: 10, flex: 1 }]}
                placeholder="Email"
              ></TextInput>
            </View>
            <View style={styles.view_end}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Onboarding")}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
