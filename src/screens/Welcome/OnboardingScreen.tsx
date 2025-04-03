import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";

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
  const [navigateLogin, setNavigateLogin] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreen>();

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.container}>
      <Image source={item.img} style={{ width: 186, height: 240 }}></Image>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const onDone = () => {
    setNavigateLogin(true);
  };

  const handleNavigateLogin = () => {
    if (navigateLogin) {
      navigation.navigate("SignIn");
    }
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="arrowright"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="check"
          color="rgba(255, 255, 255, 0.9)"
          size={24}
          onPress={handleNavigateLogin}
        />
      </View>
    );
  };
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      dotStyle={{ backgroundColor: "gray" }}
      activeDotStyle={{ backgroundColor: "blue" }}
    />
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
    paddingHorizontal: 10,
  },
});

export default OnboardingScreen;
