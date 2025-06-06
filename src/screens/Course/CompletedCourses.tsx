import React, { useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import { ProgressBar } from "react-native-paper";
import CourseDetailMenu from "./CourseDetailMenu";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { CourseType } from "../../types/CourseType";
import { WordType } from "../../types/WordType";

const words: WordType[] = [
  {
    id: "1",
    eng: 'student',
    vie: 'học sinh, sinh viên',
    transcription: "'stu:dnt",
    type: 'n',
    example: 'His younger sister is a student at that university.',
    image: "https://picsum.photos/200/300",
    level: 1,
  },
  {
    id: "2",
    eng: 'teacher',
    vie: 'giáo viên',
    transcription: "'tēCHər",
    type: 'n',
    example: 'His mother is a teacher at that university.',
    image: "https://picsum.photos/200/100",
    level: 2,
  },
  {
    id: "3",
    eng: 'school',
    vie: 'trường học',
    transcription: "sko͞ol",
    type: 'n',
    example: 'Students go to school',
    image: "https://picsum.photos/200/400",
    level: 3,
  },
];


const courses: CourseType[] = [
  {
    id: "1",
    title: "Friends Series",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 0,
    completedWords: 20,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/300",
    vocabulary: words,
  },
  {
    id: "2",
    title: "Practice in Holiday",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 0,
    completedWords: 20,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/150",
    vocabulary: words,
  },
  {
    id: "3",
    title: "At the airport",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 0,
    completedWords: 20,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/120",
    vocabulary: words,
  },
  {
    id: "4",
    title: "Sports",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 0,
    completedWords: 20,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/130",
    vocabulary: words,
  },
  {
    id: "5",
    title: "Hang out with friends",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 0,
    completedWords: 20,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/210",
    vocabulary: words,
  },
];

const NullCourse = {
  id: "",
  title: "",
  totalWords: 0,
  ongoingWords: 0,
  completedWords: 0,
  remainWords: 0,
  topic: "",
  level: "",
  image: "",
  vocabulary: [],
};

type CoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Courses"
>;

export default function CompletedCourses() {
  const navigation = useNavigation<CoursesScreenNavigationProp>();
  const [detailMenuVisible, setDetailMenuVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType>(NullCourse);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", }}>
      {/* list courses */}
      <FlatList
        style={styles.coursesList}
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setDetailMenuVisible(true)
              setSelectedCourse(item)
            }}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                  <View style={styles.detail}>
                    <Icon name="book-open" size={12} />
                    <Text style={styles.detailText}>Total words: {item.totalWords}</Text>
                  </View>
                  <View style={styles.detail}>
                    <Icon name="star" size={12} />
                    <Text style={styles.detailText}>Remain: {item.remainWords}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.detail}>
                    <Icon name="book-open" size={12} />
                    <Text style={styles.detailText}>Ongoing: {item.ongoingWords}</Text>
                  </View>
                  <View style={styles.detail}>
                    <Icon name="star" size={12} />
                    <Text style={styles.detailText}>Completed: {item.completedWords}</Text>
                  </View>
                </View>
              </View>

              <ProgressBar
                progress={100 / 100}
                color="#FF991F"
                style={{ height: 3, width: "100%", borderRadius: 10 }}
              />

              <View style={styles.detailRow}>
                <View style={styles.detail}>
                  <Text style={styles.topic}>{item.topic}</Text>
                </View>
                <View style={styles.level}>
                  <Text style={styles.levelText}>{item.level}</Text>
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
        onLearn={() => { }}
        onRepeat={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("PracticeScreen", { words: selectedCourse.vocabulary }); // Điều hướng đến PracticeScreen
        }}
        onReview={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("WordsList", { words: selectedCourse.vocabulary }); // Điều hướng đến WordsList
        }}
        selectedCourse={selectedCourse}
      />
    </View >
  );
}
const styles = StyleSheet.create({
  coursesList: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    flexDirection: "row",
    height: 140,
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
    flex: 3.1,
    borderRadius: 8,
  },
  info: {
    flex: 5,
    gap: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
  },
  detailContainer: {
    gap: 6,
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    width: "97%",
    justifyContent: "space-between",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detailText: {
    fontSize: 9.5,
    color: "#515960",
  },
  topic: {
    fontSize: 11,
    color: "#515960",
    fontWeight: 500,
  },
  level: {
    width: 52,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#F4F4F5',
  },
  levelText: {
    fontSize: 11,
    fontWeight: 500,
  }
});
