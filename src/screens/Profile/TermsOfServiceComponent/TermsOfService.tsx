import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.7;

const TermsOfService = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Thẻ Ghi Nhớ</Text>

      <View style={styles.cardContainer}>
        <Animated.View
          style={[styles.card, styles.cardFront, frontAnimatedStyle]}
        >
          <TouchableOpacity style={styles.cardContent} onPress={flipCard}>
            <Text style={styles.cardTitle}>CÂU HỎI</Text>
            <Text style={styles.cardText}>Thủ đô của Việt Nam là gì?</Text>
            <Text style={styles.tapText}>Nhấn để xem đáp án</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <TouchableOpacity style={styles.cardContent} onPress={flipCard}>
            <Text style={styles.cardTitle}>ĐÁP ÁN</Text>
            <Text style={styles.cardText}>Hà Nội</Text>
            <Text style={styles.tapText}>Nhấn để xem câu hỏi</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Text style={styles.instruction}>Nhấn vào thẻ để lật</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  cardContainer: {
    width: cardWidth,
    height: cardWidth * 1.4,
    position: "relative",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardFront: {
    backgroundColor: "#5DA3FA",
    zIndex: 1,
  },
  cardBack: {
    backgroundColor: "#58D68D",
    transform: [{ rotateY: "180deg" }],
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  tapText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    bottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: "#666",
    marginTop: 30,
  },
});

export default TermsOfService;
