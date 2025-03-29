import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function ChangePassword() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: "white",
      justifyContent: "center",
    },
    view_input: {
      flexDirection: "row",
      marginTop: 12.5,
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#2563eb",
    },
    text_input: { fontSize: 16, marginRight: 10 },
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
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 120 }}>
        <Image
          source={require("../../png/ChangePassword.png")}
          style={{ width: 186, height: 240 }}
        ></Image>
      </View>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 11,
        }}
      >
        Enter a new password
      </Text>
      <View style={styles.view_input}>
        <TextInput
          style={[styles.text_input, { flex: 1 }]}
          placeholder="Old password"
        ></TextInput>
      </View>
      <View style={styles.view_input}>
        <TextInput
          style={[styles.text_input, { flex: 1 }]}
          placeholder="New password"
        ></TextInput>
      </View>
      <View style={styles.view_input}>
        <TextInput
          style={[styles.text_input, { flex: 1 }]}
          placeholder="Confirm new password"
        ></TextInput>
      </View>
      <View style={styles.view_end}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
