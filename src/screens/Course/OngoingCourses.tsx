import React, { useCallback, useEffect, useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import { ProgressBar } from "react-native-paper";
import CourseDetailMenu from "./CourseDetailMenu";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { CourseDetailMenuProps } from "../../interfaces/CourseInterface";
import { CourseType } from "../../types/CourseType";
import { WordType } from "../../types/WordType";
import { useGetAllOngoingCoursesQuery } from "../../services/courseService";

const words: WordType[] = [
  {
    "id": "1",
    "eng": "student",
    "vie": "học sinh, sinh viên",
    "transcription": "'stuː.dənt",
    "type": "n",
    "example": "His younger sister is a student at that university.",
    "image": "https://picsum.photos/200/300?random=1",
    "level": 3
  },
  {
    "id": "2",
    "eng": "book",
    "vie": "sách",
    "transcription": "bʊk",
    "type": "n",
    "example": "She borrowed a book from the library.",
    "image": "https://picsum.photos/200/300?random=2",
    "level": 3
  },
  {
    "id": "3",
    "eng": "quickly",
    "vie": "nhanh chóng",
    "transcription": "'kwɪk.li",
    "type": "adv",
    "example": "He ran quickly to catch the bus.",
    "image": "https://picsum.photos/200/300?random=3",
    "level": 2
  },
  {
    "id": "4",
    "eng": "beautiful",
    "vie": "xinh đẹp",
    "transcription": "'bjuː.tɪ.fəl",
    "type": "adj",
    "example": "That flower is really beautiful.",
    "image": "https://picsum.photos/200/300?random=4",
    "level": 2
  },
  {
    "id": "5",
    "eng": "engineer",
    "vie": "kỹ sư",
    "transcription": ".en.dʒɪˈnɪər",
    "type": "n",
    "example": "My uncle is a software engineer.",
    "image": "https://picsum.photos/200/300?random=5",
    "level": 3
  },
  {
    "id": "6",
    "eng": "independence",
    "vie": "sự độc lập",
    "transcription": ".ɪn.dɪˈpen.dəns",
    "type": "n",
    "example": "The country gained independence in 1945.",
    "image": "https://picsum.photos/200/300?random=6",
    "level": 4
  },
  {
    "id": "7",
    "eng": "challenge",
    "vie": "thử thách",
    "transcription": "'tʃæl.ɪndʒ",
    "type": "n",
    "example": "Learning a new language is a challenge.",
    "image": "https://picsum.photos/200/300?random=7",
    "level": 3
  },
  {
    "id": "8",
    "eng": "implement",
    "vie": "thực hiện, triển khai",
    "transcription": "'ɪm.plɪ.ment",
    "type": "v",
    "example": "The company plans to implement new strategies next month.",
    "image": "https://picsum.photos/200/300?random=8",
    "level": 4
  },
  {
    "id": "9",
    "eng": "sustainable",
    "vie": "bền vững",
    "transcription": "səˈsteɪ.nə.bəl",
    "type": "adj",
    "example": "We must develop sustainable energy sources.",
    "image": "https://picsum.photos/200/300?random=9",
    "level": 3
  },
  {
    "id": "10",
    "eng": "generate",
    "vie": "tạo ra, sinh ra",
    "transcription": "'dʒen.ə.reɪt",
    "type": "v",
    "example": "Solar panels generate electricity from sunlight.",
    "image": "https://picsum.photos/200/300?random=10",
    "level": 3
  }
]

const courses: CourseType[] = [
  {
    id: "1",
    title: "Hang out with friends",
    totalWords: 20,
    remainWords: 10,
    ongoingWords: 10,
    completedWords: 0,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/300",
    vocabulary: words,
  },
  {
    id: "2",
    title: "Friends Series",
    totalWords: 20,
    remainWords: 0,
    ongoingWords: 10,
    completedWords: 10,
    topic: "People-lifestyle",
    level: "A1 - A2",
    image: "https://picsum.photos/200/150",
    vocabulary: words,
  },
];

const NullCourseDetailMenu = {
  course_id: "",
  completedWords: 0,
  remainWords: 0,
};

type CoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Courses"
>;

export default function OngoingCourses() {
  const navigation = useNavigation<CoursesScreenNavigationProp>();
  const [detailMenuVisible, setDetailMenuVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetailMenuProps>(NullCourseDetailMenu);

  const {
    data: courses,
    refetch,
  } = useGetAllOngoingCoursesQuery();

  useEffect(() => {
    if (courses) {
      console.log(courses)
    }
    else console.log("khong lay duoc course")
  }, [courses]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
              setSelectedCourse({
                course_id: item.id,
                completedWords: item.completedWords,
                remainWords: item.remainWords
              })
              setDetailMenuVisible(true)
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
                progress={item.progressScore / (6 * item.totalWords)}
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
        onLearn={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("LearnScreen", { course_id: selectedCourse.course_id }); // Điều hướng đến LearnScreen
        }}
        onRepeat={() => {
          setDetailMenuVisible(false); // Đóng modal trước
        }}
        onReview={() => {
          setDetailMenuVisible(false); // Đóng modal trước
          navigation.navigate("WordsList", { course_id: selectedCourse.course_id }); // Điều hướng đến WordsList
        }}
        selectedCourse={selectedCourse}
      />
    </View>
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
