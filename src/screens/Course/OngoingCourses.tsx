import React, { useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import { ProgressBar } from "react-native-paper";
import CourseDetailMenu from "./CourseDetailMenu";
import RepeatModeMenu from "../Exercise/RepeatModeMenu";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

const courses = [
  {
    id: "1",
    title: "Hang out with friends",
    lesson: 1,
    students: 127,
    advanced: 76,
    points: 76,
    days: 23,
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    title: "Friends Series",
    lesson: 4,
    students: 15,
    advanced: 34,
    points: 15,
    days: 45,
    image: "https://picsum.photos/200/150",
  },
];
type OngoingCoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OnGoingCourses"
>;

export default function OngoingCourses() {
  const navigation = useNavigation<OngoingCoursesScreenNavigationProp>();
  const [detailMenuVisible, setDetailMenuVisible] = useState(false);
  const [repeatModeMenuVisible, setRepeatModeMenuVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* list courses */}
      <FlatList
        style={styles.coursesList}
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setDetailMenuVisible(true)}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.infoRow}>
                <View style={styles.detail}>
                  <Icon name="book-open" size={14} />
                  <Text style={styles.detailText}>Lesson: {item.lesson}</Text>
                </View>
                <View style={styles.detail}>
                  <Icon name="star" size={14} />
                  <Text style={styles.detailText}>
                    Advanced: {item.advanced}
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={item.points / 100}
                color="#FF991F"
                style={{ height: 3, width: 200, borderRadius: 10 }}
              />
              <View style={styles.infoRow}>
                <View style={styles.detail}>
                  <Text style={styles.detailText}>
                    points: {item.points} / 100
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailText}>days: {item.days}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* modals */}
      <CourseDetailMenu
        visible={detailMenuVisible}
        onClose={() => setDetailMenuVisible(false)}
        onLearn={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("LearnByTranslate"); // Điều hướng đến LearnNewWord
        }}
        onRepeat={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          setRepeatModeMenuVisible(true); // Mở menu chọn repeat mode
        }}
        onReview={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("WordsList"); // Điều hướng đến RecallWord
        }}
      />
      <RepeatModeMenu
        visible={repeatModeMenuVisible}
        onClose={() => setRepeatModeMenuVisible(false)}
        onPair={() => {
          setRepeatModeMenuVisible(false); // Đóng modal trước
          navigation.navigate("PairWord"); // Điều hướng đến PairWord
        }}
        onGuess={() => {
          setRepeatModeMenuVisible(false); // Đóng modal trước
          navigation.navigate("GuessWord"); // Điều hướng đến GuessWord}
        }}
        onRecall={() => {
          setRepeatModeMenuVisible(false); // Đóng modal trước
          navigation.navigate("RecallWord"); // Điều hướng đến RecallWord}
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  coursesList: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    flexDirection: "row",
    height: 130,
    backgroundColor: "#fff",
    borderColor: "#F3F3F5",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 12,
    marginBottom: 8,
  },
  image: {
    width: 130,
    borderRadius: 8,
  },
  info: {
    gap: 14,
    alignSelf: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
  },
  infoRow: {
    flexDirection: "row",
    width: 190,
    justifyContent: "space-between",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detailText: {
    fontSize: 10,
    fontWeight: 500,
    color: "#515960",
  },
});
