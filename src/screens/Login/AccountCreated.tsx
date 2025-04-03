import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const AccountCreatedScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your profile is created!</Text>
        <Text style={styles.subtitle}>Your profile is ready to use</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Answer a few more questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DFDEE4",
  },
  secondaryButtonText: {
    color: "#263038",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AccountCreatedScreen;
