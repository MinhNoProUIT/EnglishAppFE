import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createEntityAdapter } from "@reduxjs/toolkit";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
export default function SighIn() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: "white",
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      padding: 8,
      marginBottom: 20,
      marginTop: 120,
    },
    socialButton: {
      flexDirection: "row",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#2563eb",
      backgroundColor: "white",
      marginTop: 20,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    socialText: {
      fontSize: 16,
      marginLeft: 8,
    },
    text_input: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#2563eb",
      padding: 10,
      marginTop: 20,
    },
    input: { fontSize: 16, marginLeft: 8 },
    button_login: {
      marginTop: 16,
      paddingHorizontal: 22,
      paddingVertical: 12,
      backgroundColor: "blue",
      borderRadius: 8,
    },
    view_forgot: {
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      flexDirection: "row",
      gap: 8,
    },
    view_or: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
    },
    line: {
      height: 1,
      backgroundColor: "#F3F3F5",
      flex: 1,
    },
    view_end: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
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
            <Text style={styles.title}>English App</Text>
            <View>
              <View style={styles.text_input}>
                {/*email */}
                <MaterialIcons
                  name="email"
                  size={20}
                  color={"black"}
                ></MaterialIcons>
                <TextInput style={styles.input} placeholder="Email"></TextInput>
              </View>
              <View style={styles.text_input}>
                {/*password */}
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
            </View>
            <TouchableOpacity style={styles.button_login}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.view_forgot}>
              <Text style={{ fontSize: 16 }}>Forgot your password?</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#2563eb" }}>
                  Reset your password
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view_or}>
              <View style={styles.line}></View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Nunito",
                  marginHorizontal: 10,
                }}
              >
                OR
              </Text>
              <View style={styles.line}></View>
            </View>

            <View>
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
                  <Text style={styles.socialText}>Sign in with Google</Text>
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
                  <Text style={styles.socialText}>Sign in with Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <View style={styles.view_end}>
                <Text style={{ fontSize: 16 }}>Are you not registered?</Text>
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: "#2563eb" }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
