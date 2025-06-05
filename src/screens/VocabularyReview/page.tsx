// App.js (hoặc App.tsx nếu dùng TypeScript)

import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { LinearGradient } from "expo-linear-gradient";

export default function VocabularyReview() {
  const barData = [
    { value: 50, label: "Mon" },
    { value: 80, label: "Tue" },
    { value: 40, label: "Wed" },
    { value: 90, label: "Thu" },
    { value: 60, label: "Fri" },
    { value: 20, label: "Sat" },
    { value: 70, label: "Sun" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#e0f7fa", "#80deea"]} style={styles.container}>
        <Text style={styles.title}>Weekly Activity</Text>
        <BarChart
          barWidth={30}
          noOfSections={4}
          barBorderRadius={10}
          frontColor="#0044cc"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          isAnimated
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0044cc",
    textAlign: "center",
  },
});
