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
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import Icon2 from '@expo/vector-icons/Ionicons';
import Icon3 from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

const words = [
  {
    id: "1",
    eng: 'student',
    vie: 'học sinh, sinh viên',
    transcription: "'stu:dnt",
    type: 'n',
    example: 'His younger sister is a student at that university.',
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    eng: 'teacher',
    vie: 'giáo viên',
    transcription: "'tēCHər",
    type: 'n',
    example: 'His mother is a teacher at that university.',
    image: "https://picsum.photos/200/100",
  },
  {
    id: "3",
    eng: 'school',
    vie: 'trường học',
    transcription: "sko͞ol",
    type: 'n',
    example: 'Students go to school',
    image: "https://picsum.photos/200/400",
  },
];

export default function LearnByFlashcard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContinuable, setIsContinuable] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Hiệu ứng lật thẻ
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setIsContinuable(true);
    Animated.spring(flipAnimation, {
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
      flipAnimation.setValue(0); // Reset trạng thái lật thẻ
      setIsFlipped(false);
      setIsContinuable(false);
    }
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
      {/* status */}
      <View style={styles.progressBarContainer}>
        <TouchableOpacity>
          <Icon name='close' size={24} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <ProgressBar
          progress={(currentIndex + 1) / words.length}
          color="#2563EB"
          style={styles.progressBar}
        />
      </View>

      <View style={styles.mainContentContainer}>
        {/* buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circleButton}>
            <Icon2 name="volume-high" size={28} color="#FF991F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Icon3 name="snail" size={28} color="#FF991F" />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.cardsContainer, { transform: [{ translateX }] },]}>
          {words.map((word, i) => (
            <View key={i} style={styles.cardWrapper}>
              {/* front */}
              < Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]} >
                <TouchableOpacity style={styles.cardContent} onPress={flipCard}>
                  <Image style={styles.image} source={{ uri: word.image }} />
                  <Text style={styles.example}>{word.example}</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* back */}
              <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                <TouchableOpacity style={[styles.cardContent, styles.meaningContent]} onPress={flipCard}>
                  <Text style={styles.eng}>{word.eng}</Text>
                  <Text style={styles.transcription}>/{word.transcription}/</Text>
                  <Text style={styles.vie}>{word.vie} ({word.type})</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          ))}
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
    paddingVertical: 20,
  },
  // progress bar
  progressBarContainer: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  progressBar: {
    height: 20,
    width: 340,
    borderRadius: 10,
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
    width: width * words.length,
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