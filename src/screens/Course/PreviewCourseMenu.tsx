import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import Icon2 from "@expo/vector-icons/SimpleLineIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { useGetAllByCourseQuery } from "../../services/WordService";
import { CourseType } from "../../types/CourseType";
import { WordType } from "../../types/WordType";
import { LockedCourse } from "../../interfaces/CourseInterface";
interface CourseMenuProps {
  visible: boolean;
  onClose: () => void;
  selectedCourse: LockedCourse;
  isActive: boolean;
}

type CoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Courses"
>;

const course = {
  id: "1",
  name: "In Court",
  level: "A1 - A2",
  numberOfWords: "30",
  description:
    "Describe some thing about this course. People will learn words about some People will learn words about some People will learn words about some topic from this course.",
  image: "https://picsum.photos/200/300",
};

const words: WordType[] = [
  {
    id: "1",
    eng: "student",
    vie: "học sinh, sinh viên",
    transcription: "'stuː.dənt",
    type: "n",
    example: "His younger sister is a student at that university.",
    image: "https://picsum.photos/200/300?random=1",
    level: 3,
  },
  {
    id: "2",
    eng: "book",
    vie: "sách",
    transcription: "bʊk",
    type: "n",
    example: "She borrowed a book from the library.",
    image: "https://picsum.photos/200/300?random=2",
    level: 3,
  },
  {
    id: "3",
    eng: "quickly",
    vie: "nhanh chóng",
    transcription: "'kwɪk.li",
    type: "adv",
    example: "He ran quickly to catch the bus.",
    image: "https://picsum.photos/200/300?random=3",
    level: 2,
  },
  {
    id: "4",
    eng: "beautiful",
    vie: "xinh đẹp",
    transcription: "'bjuː.tɪ.fəl",
    type: "adj",
    example: "That flower is really beautiful.",
    image: "https://picsum.photos/200/300?random=4",
    level: 2,
  },
  {
    id: "5",
    eng: "engineer",
    vie: "kỹ sư",
    transcription: ".en.dʒɪˈnɪər",
    type: "n",
    example: "My uncle is a software engineer.",
    image: "https://picsum.photos/200/300?random=5",
    level: 3,
  },
  {
    id: "6",
    eng: "independence",
    vie: "sự độc lập",
    transcription: ".ɪn.dɪˈpen.dəns",
    type: "n",
    example: "The country gained independence in 1945.",
    image: "https://picsum.photos/200/300?random=6",
    level: 4,
  },
  {
    id: "7",
    eng: "challenge",
    vie: "thử thách",
    transcription: "'tʃæl.ɪndʒ",
    type: "n",
    example: "Learning a new language is a challenge.",
    image: "https://picsum.photos/200/300?random=7",
    level: 3,
  },
  {
    id: "8",
    eng: "implement",
    vie: "thực hiện, triển khai",
    transcription: "'ɪm.plɪ.ment",
    type: "v",
    example: "The company plans to implement new strategies next month.",
    image: "https://picsum.photos/200/300?random=8",
    level: 4,
  },
  {
    id: "9",
    eng: "sustainable",
    vie: "bền vững",
    transcription: "səˈsteɪ.nə.bəl",
    type: "adj",
    example: "We must develop sustainable energy sources.",
    image: "https://picsum.photos/200/300?random=9",
    level: 3,
  },
  {
    id: "10",
    eng: "generate",
    vie: "tạo ra, sinh ra",
    transcription: "'dʒen.ə.reɪt",
    type: "v",
    example: "Solar panels generate electricity from sunlight.",
    image: "https://picsum.photos/200/300?random=10",
    level: 3,
  },
];

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

const PreviewCourseMenu: React.FC<CourseMenuProps> = ({
  visible,
  onClose,
  selectedCourse,
  isActive,
}) => {
  const navigation = useNavigation<CoursesScreenNavigationProp>();


  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              {/* image */}
              <Image style={styles.image} source={{ uri: selectedCourse.image_url }} />

              {/* text */}
              <View style={styles.textPart}>
                <View style={styles.row}>
                  <Text style={styles.title}>{selectedCourse.title}</Text>
                  <View style={styles.details}>
                    <View
                      style={[styles.detail, { backgroundColor: "#F4F4F5" }]}
                    >
                      <Text style={styles.detailText}>{selectedCourse.level}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.description} numberOfLines={3}>
                  {selectedCourse.description}
                </Text>
              </View>

              {/* button */}
              {isActive ?
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    onClose();
                    navigation.navigate("LearnScreen", { course_id: selectedCourse.id, onFinish: () => { } }); // Điều hướng đến LearnScreen
                  }}
                >
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                :
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                      onClose();
                      navigation.navigate("PaymentIntroduction")
                    }}
                  >
                    <Text style={styles.buttonText}>Get premium</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {}}
                  >
                    <Text style={styles.buttonText}>{selectedCourse.price} coins</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback >
    </Modal >
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Làm mờ nền phía sau
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: "85%",
    height: "55%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 10,
  },
  image: {
    width: "85%",
    height: "50%",
    borderRadius: 10,
    marginTop: 20,
  },
  textPart: {
    width: "80%",
    marginTop: 18,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  details: {
    flexDirection: "row",
    gap: 10,
  },
  detail: {
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  detailText: {
    fontSize: 14,
    fontWeight: 500,
  },
  description: {
    textAlign: "justify",
    fontSize: 14,
    fontWeight: 400,
    color: "#A8ACAF",
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#2563EB",
    position: "absolute",
    bottom: 22,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
  },

  buttonContainer: {
    width: "80%",
    flexDirection: 'row',
    gap: 15,
    position: "absolute",
    bottom: 22,
  },
  button2: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#2563EB",
    borderWidth: 1,
  },

});

export default PreviewCourseMenu;
