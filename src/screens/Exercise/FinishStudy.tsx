import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const vocabularyData = [
  {
    isCorrected: false,
    word: "apple",
    meaning: "Quả táo (n)",
  },
  {
    isCorrected: true,
    word: "book",
    meaning: "Quyển sách (n)",
  },
  {
    isCorrected: false,
    word: "sun",
    meaning: "Mặt trời (n)",
  },
  { word: "newsagent", meaning: "Sạp bán báo (n)", isCorrected: false },
  {
    word: "grocery store",
    meaning: "Cửa hàng tạp hóa (phrase)",
    isCorrected: false,
  },
  { word: "casino", meaning: "Sòng bạc (n)", isCorrected: true },
  { word: "partner", meaning: "Cộng sự, đối tác (n)", isCorrected: true },
  {
    word: "prime",
    meaning: "Chủ yếu, cơ bản, sơ khai (adj)",
    isCorrected: true,
  },
  {
    isCorrected: true,
    word: " red apple",
    meaning: "quả táo đỏ",
  },
  {
    isCorrected: true,
    word: "book store",
    meaning: " cửa hàng sách",
  },
];

export default function FinishStudy({ onNext }: { onNext: () => void }) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFill(60);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 100,
          marginBottom: 100,
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.5,

            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 22, color: "#FFA500", fontWeight: "bold" }}>
            Cố gắng thêm chút nhé!!!
          </Text>
          <View style={styles.circleWrapper}>
            <AnimatedCircularProgress
              size={180}
              width={30}
              fill={fill}
              tintColor="#FFA500"
              backgroundColor="#eee"
              rotation={0}
              duration={2000}
            >
              {(f) => <Text style={styles.percentage}>{Math.round(f)}%</Text>}
            </AnimatedCircularProgress>
          </View>
          <Text
            style={{
              fontSize: 22,
              color: "#FFA500",
              marginBottom: 20,
              width: 200,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Bạn đã trả lời đúng 6/10 câu
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: "#ebebeb",
            borderRadius: 15,
            padding: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              data={vocabularyData}
              keyExtractor={(item) => item.word}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={styles.row}>
                    <View>
                      {item.isCorrected ? (
                        <FontAwesome
                          name="check-circle-o"
                          size={24}
                          color="green"
                        />
                      ) : (
                        <AntDesign
                          name={"closecircle"}
                          size={20}
                          color={"red"}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.word}>{item.word}</Text>
                    </View>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text style={styles.meaning}>{item.meaning}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  continueButton: {
    height: 50,
    width: 220,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#2563EB",
    position: "absolute",
    bottom: 35,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFA500",
  },
  circleWrapper: {
    width: 180,
    height: 180,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFA500",
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 180,
    backgroundColor: "#FFA500",
    position: "absolute",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    gap: 10,
    justifyContent: "center",
  },

  word: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },

  meaning: {
    fontWeight: "light",
    fontSize: 16,
    marginBottom: 2,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
});
