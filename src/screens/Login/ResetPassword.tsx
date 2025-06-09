import React, { useState } from "react";
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
  Alert,
} from "react-native";
import ImageForgot from "../../svg/imageReset.svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useResetPasswordMutation } from "../../services/AuthService";

type RootStackParamList = {
  ResetPassword: { token: string }; // Kiểu tham số token cho màn hình ResetPassword
};
type ResetPasswordRouteProps = RouteProp<RootStackParamList, "ResetPassword">;

export default function ResetPassword() {
  const route = useRoute<ResetPasswordRouteProps>();
  const { token } = route.params; // Lấy token từ route params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới.");
      return;
    }

    if (confirmPassword !== newPassword) {
      Alert.alert("Lỗi", "Vui lòng xác nhận lại mật khẩu.");
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword }).unwrap();
      Alert.alert("Thành công", response.message);
      // Chuyển hướng đến màn hình đăng nhập hoặc màn hình chính
    } catch (error: unknown) {
      // Ép kiểu error về Error để có thể truy cập message
      if (error instanceof Error) {
        Alert.alert("Lỗi", error.message); // Truy cập message của Error
      } else {
        Alert.alert("Lỗi", "Đã có lỗi xảy ra");
      }
    }
  };
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
      marginTop: 8,
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
                Your password has been reset and you can login from here.
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
                marginBottom: 8,
              }}
            >
              Enter a new password
            </Text>

            <View style={styles.view_email}>
              <TextInput
                style={[styles.input, { marginRight: 10, flex: 1 }]}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              ></TextInput>
            </View>
            <View style={styles.view_email}>
              <TextInput
                style={[styles.input, { marginRight: 10, flex: 1 }]}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              ></TextInput>
            </View>
            <View style={styles.view_end}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
