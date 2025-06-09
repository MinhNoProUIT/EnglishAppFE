import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function FinishStudy({
  onNext,
  score,
  total
}: {
  onNext: () => void,
  score: number,
  total: number,
}) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    console.log(score)
    const timeout = setTimeout(() => {
      setFill(score / total * 100);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.circleWrapper}>
          <AnimatedCircularProgress
            size={180}
            width={30}
            fill={fill}
            tintColor="#2563EB"
            backgroundColor="#eee"
            rotation={0}
            duration={2000}
          >
            {(f: number) => <Text style={styles.percentage}>{Math.round(f)}%</Text>}
          </AnimatedCircularProgress>
        </View>

        <Text style={styles.contentText}>
          Bạn đã trả lời đúng {score}/{total} câu
        </Text>

        <Text style={styles.contentText}>
          Keep on practicing!
        </Text>
      </View>

      {/* button */}
        <TouchableOpacity style={styles.button} onPress={() => onNext()}>
          <Text style={styles.buttonText}>Thoát</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  circleWrapper: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  percentage: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFA500",
  },
  contentText: {
    fontSize: 22,
    color: "#FFA500",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },

  // button
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#2563EB',
    borderWidth: 1,
    borderBottomWidth: 2,
  },
  buttonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: 500,
  },
});
