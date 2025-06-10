import React, { useCallback, useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PreviewCourseMenu from "./PreviewCourseMenu";
import { useGetAllLearnMoreCoursesQuery } from "../../services/courseService";
import { LockedCourse } from "../../interfaces/CourseInterface";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import PreviewCourseMenuBuy from "./PreviewCourseMenuBuy";

import { useGetUserCoursesQuery } from "../../services/userCourseService";
import Entypo from "@expo/vector-icons/Entypo";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";

const courses = [
  {
    id: "1",
    title: "In Court",
    topic: "Business",
    isActive: "true",
    level: "A1 - A2",
    detail: "Lorem Ipsum is simply dummy test of the prin...",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    title: "Sport",
    topic: "People-lifestyle",
    isActive: "true",
    level: "A1 - A2",
    detail: "Lorem Ipsum is simply dummy test of the prin...",
    image: "https://picsum.photos/200/150",
  },
  {
    id: "3",
    title: "At the work",
    topic: "Business",
    isActive: "false",
    level: "A1 - A2",
    detail: "Lorem Ipsum is simply dummy test of the prin...",
    image: "https://picsum.photos/200/120",
  },
  {
    id: "4",
    title: "Weather",
    topic: "People-lifestyle",
    isActive: "false",
    level: "A1 - A2",
    detail: "Lorem Ipsum is simply dummy test of the prin...",
    image: "https://picsum.photos/200/130",
  },
];

const NullCoursePreviewMenu = {
  id: "",
  title: "",
  topic: "",
  level: "",
  image_url: "",
  description: "",
  price: 0,
  isActive: true,
};

type CoursesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Courses"
>;
export default function LockedCourses() {
  const navigation = useNavigation<CoursesScreenNavigationProp>();
  const [previewCourseMenuVisible, setPreviewCourseMenuVisible] =
    useState(false);
  const [selectedCourse, setSelectedCourse] = useState<LockedCourse>(
    NullCoursePreviewMenu
  );

  //   const route = useRoute<RouteProp<RootStackParamList, "LockedCourses">>();

  //   const isLoadPayment = route.params?.isLoadPayment;

  const [previewCourseMenuVisibleBuy, setpreviewCourseMenuVisibleBuy] =
    useState(false);
  const {
    data: userCourseResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserCoursesQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  //if (isLoadPayment) refetch();

  const [selectedItem, setSelectedItem] = useState({});

  const userCourseData = userCourseResponse?.Data.courses;
  if (isLoading) return;
  const isPremium = userCourseResponse?.Data.isPremium;
  console.log("userCourseData", userCourseData);
  console.log("isPremium", isPremium);

  return (
    <View style={{ flex: 1 }}>
      {/* list courses */}
      <FlatList
        style={styles.coursesList}
        data={userCourseData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.detail} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>

              {item.isBuy || isPremium ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#2563EB" }]}
                  onPress={() => {
                    setPreviewCourseMenuVisible(true);
                    setSelectedItem(item);
                  }}
                >
                  <Icon name="arrow-right" size={15} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: "red", height: 58 },
                  ]}
                  onPress={() => {
                    setpreviewCourseMenuVisibleBuy(true);
                    setSelectedItem(item);
                  }}
                >
                  <Entypo name="lock" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.topic}>{item.topics.name}</Text>
              <View style={styles.level}>
                <Text style={styles.levelText}>{item.level}</Text>
              </View>
            </View>
          </View>
        )}
      />
      {/* modals */}
      <PreviewCourseMenu
        item={selectedItem}
        visible={previewCourseMenuVisible}
        onClose={() => {
          setPreviewCourseMenuVisible(false);
          setSelectedItem({});
        }}
      />

      <PreviewCourseMenuBuy
        item={selectedItem}
        refetch={refetch}
        visible={previewCourseMenuVisibleBuy}
        onClose={() => {
          setpreviewCourseMenuVisibleBuy(false);
          setSelectedItem({});
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  coursesList: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    height: 120,
    backgroundColor: "#fff",
    borderColor: "#F3F3F5",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    gap: 2,
    width: 200,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
  },
  detail: {
    width: 180,
    flexWrap: "wrap",
    fontSize: 12,
    fontWeight: 500,
    color: "#A8ACAF",
  },
  button: {
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
  },
  keyImage: {
    height: 30,
    width: 30,
  },
  topic: {
    fontSize: 14,
    fontWeight: 500,
  },
  level: {
    width: 52,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#F4F4F5",
  },
  levelText: {
    fontSize: 12,
    fontWeight: 600,
  },
});
