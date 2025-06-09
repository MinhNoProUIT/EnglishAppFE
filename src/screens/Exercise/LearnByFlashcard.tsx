import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import Icon from '@expo/vector-icons/Ionicons';
import { Word } from "../../interfaces/WordInterface";
import { useCreateUserProgressMutation } from "../../services/userProgressService";

const { width } = Dimensions.get("window");

export default function LearnByListenAndGuess({ words, onNext }: { words: Word[], onNext: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContinuable, setIsContinuable] = useState(false);
  const flipAnimations = useRef(words.map(() => new Animated.Value(0))).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const [flippedOnce, setFlippedOnce] = useState<boolean[]>(words.map(() => false));
  const [createUserProgress] = useCreateUserProgressMutation();

  // Hiệu ứng lật thẻ
  const flipCard = async (index: number, word_id: string) => {
    setIsFlipped(!isFlipped);
    setIsContinuable(true);
    const alreadyFlipped = flippedOnce[index];

    if (!alreadyFlipped) {
      try {
        await createUserProgress(word_id);
      } catch (error) {
        console.error("Failed to create user progress:", error);
      }
      const updated = [...flippedOnce];
      updated[index] = true;
      setFlippedOnce(updated);
    }

    Animated.spring(flipAnimations[index], {
      toValue: isFlipped ? 0 : 1,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  // Hiệu ứng trượt sang thẻ tiếp theo
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      Animated.timing(translateX, {
        toValue: -(currentIndex + 1) * width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setIsContinuable(false);
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        {/* buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton}>
            <Icon name="volume-high" size={28} color="#FF991F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Image style={styles.snailImage}
              source={require("../../../assets/SnailIcon.png")} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.cardsContainer, { transform: [{ translateX }], width: width * words.length, },]}>
          {words.map((word, i) => {
            const frontAnimatedStyle = {
              transform: [
                {
                  rotateY: flipAnimations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            };
            const backAnimatedStyle = {
              transform: [
                {
                  rotateY: flipAnimations[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["180deg", "360deg"],
                  }),
                },
              ],
            };
            return (
              <View key={i} style={styles.cardWrapper}>
                {/* front */}
                < Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]} >
                  <TouchableOpacity style={styles.cardContent} onPress={() => flipCard(i, word.id)}>
                    <Image style={styles.image} source={{ uri: word.imageurl }} />
                    <Text style={styles.example}>{word.examplesentence}</Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* back */}
                <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                  <TouchableOpacity style={[styles.cardContent, styles.meaningContent]} onPress={() => flipCard(i, word.id)}>
                    <Text style={styles.eng}>{word.englishname}</Text>
                    <Text style={styles.transcription}>/{word.transcription}/</Text>
                    <Text style={styles.vie}>{word.vietnamesename} ({word.type})</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )
          })}
        </Animated.View>

        {/* clickIcon */}
        <Image style={styles.clickIcon}
          source={require("../../../assets/HandClick.png")} />
      </View>

      {/* continue button */}
      <TouchableOpacity style={[styles.continueButton, !isContinuable && styles.buttonDisabled]} onPress={handleNext} disabled={!isContinuable}>
        <Text style={[styles.continueButtonText, !isContinuable && styles.buttonDisabledText]}>Tiếp tục</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 20,
  },

  //circle buttons
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    position: 'absolute',
    top: -28,
    zIndex: 10,
  },
  circleButton: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: "#dedede",
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 4,
  },
  snailImage: {
    height: 25,
    width: 25,
  },
  clickIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: -20,
    right: 30,
    zIndex: 10,
  },
  mainContentContainer: {
    width: width,
    height: "65%",
    marginTop: 24,
  },

  // cards
  cardsContainer: {
    height: "100%",
    flexDirection: "row",
  },
  cardWrapper: {
    width: width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  cardFront: {
    backgroundColor: "#fff",
    zIndex: 1,
  },
  cardBack: {
    backgroundColor: "#fff",
    transform: [{ rotateY: "180deg" }],
  },

  // content
  cardContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  image: {
    height: "60%",
    width: "100%",
    borderRadius: 10,
    marginTop: 35,
  },
  example: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: 'center',
  },
  meaningContent: {
    justifyContent: 'center',
    gap: 20,
  },
  eng: {
    fontSize: 22,
    fontWeight: "bold",
  },
  transcription: {
    fontSize: 20,
    fontWeight: 300,
  },
  vie: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // continue button
  continueButton: {
    height: 50,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#2563EB',
    position: 'absolute',
    bottom: 25,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
  },
  buttonDisabled: {
    backgroundColor: "#dedede", // Màu nhạt hơn khi chưa lật thẻ
  },
  buttonDisabledText: {
    color: 'gray',
  }
});