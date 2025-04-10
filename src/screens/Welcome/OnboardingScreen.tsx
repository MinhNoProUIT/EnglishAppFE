import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Slide {
  id: number;
  title: string;
  description: string;
  img: number;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Lesson on demand",
    description:
      "Now, It’s your turn to choose the subject of your course. In SpeakUp, you will learn vocabulary, phrases, pronunciations, and grammar patterns through several courses with various topics. Try it and find its efficiency.",
    img: require("../../png/Onboarding1.png"),
  },
  {
    id: 2,
    title: "It’s gamified!",
    description:
      "The smart competitive ones, or those who look for the fun side of everything, will have a great learning experience here. Every step you take, any progress you make, SpeakUp has a reward to encourage your achievement.",
    img: require("../../png/Onboarding2.png"),
  },
  {
    id: 3,
    title: "Take learning beyond the classroom walls",
    description:
      "Find certified teachers, personalize your own English learning plan.",
    img: require("../../png/Onboarding3.png"),
  },
];

type LoginScreen = StackNavigationProp<RootStackParamList, "SignIn">;

const OnboardingScreen = () => {
  const navigation = useNavigation<LoginScreen>();

  const [showSplash, setShowSplash] = useState(true);
  const [onboarding, setOnboarding] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.clear();

    // Giả sử bạn lưu trạng thái "hasSeenSplash" vào AsyncStorage
    AsyncStorage.getItem("hasSeenSplash").then((value) => {
      if (value) {
        // Đã xem splash, chuyển thẳng đến Onboarding
        setShowSplash(false);
        setOnboarding(true);
      } else {
        // Chưa xem splash, hiển thị trong 2 giây rồi chuyển
        const timer = setTimeout(() => {
          setShowSplash(false);
          setOnboarding(true);
          AsyncStorage.setItem("hasSeenSplash", "true");
        }, 2000);
        return () => clearTimeout(timer);
      }
    });
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("../../png/ChangePassword.png")}
          style={styles.logo}
        />
        <Text style={styles.splashText}>English App</Text>
      </View>
    );
  }

  // Render Onboarding nếu đã chuyển đổi
  return (
    <>
      {onboarding && (
        <AppIntroSlider
          renderItem={({ item }: { item: Slide }) => (
            <View style={styles.container}>
              <Image source={item.img} style={{ width: 186, height: 240 }} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          data={slides}
          onDone={() => navigation.navigate("SignIn")}
          renderNextButton={() => (
            <View style={styles.buttonCircle}>
              <AntDesign
                name="arrowright"
                color="rgba(255, 255, 255, .9)"
                size={24}
              />
            </View>
          )}
          renderDoneButton={() => (
            <View style={styles.buttonCircle}>
              <AntDesign
                name="check"
                color="rgba(255, 255, 255, 0.9)"
                size={24}
              />
            </View>
          )}
          dotStyle={{ backgroundColor: "gray" }}
          activeDotStyle={{ backgroundColor: "blue" }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  logo: { width: 186, height: 240 },
  splashText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default OnboardingScreen;
