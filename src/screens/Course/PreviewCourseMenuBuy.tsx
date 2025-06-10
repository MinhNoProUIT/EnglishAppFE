import React, { useState } from "react";
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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch } from "react-redux";
import {
  userCoinApi,
  useUpdateTotalCoinMutation,
} from "../../services/userCoinService";

import { useCreateUserCourseMutation } from "../../services/userCourseService";
interface CourseMenuProps {
  visible: boolean;
  item: any;
  onClose: () => void;
  refetch: () => void;
}

const course = {
  id: "1",
  name: "In Court",
  level: "A1 - A2",
  numberOfWords: "30",
  description:
    "Describe some thing about this course. People will learn words about some People will learn words about some People will learn words about some topic from this course.",
  image: "https://picsum.photos/200/300",
};

const PreviewCourseMenuBuy: React.FC<CourseMenuProps> = ({
  visible,
  onClose,
  item,
  refetch,
}) => {
  console.log(item);

  const dispatch = useDispatch();

  const [updateTotalCoin] = useUpdateTotalCoinMutation();

  const [courseId, setCourseId] = useState("");

  const [createUserCourse, { isLoading, isError, error, isSuccess }] =
    useCreateUserCourseMutation();

  const handleCoinUpdate = async (coinChange: number) => {
    try {
      // Gọi API để cập nhật coin
      coinChange = coinChange * -1;
      await updateTotalCoin({ coinChange }).unwrap();

      const result = await createUserCourse({
        course_id: item.id,
      }).unwrap();
      console.log("Course created:", result);

      // Sau khi cập nhật thành công, tự động cập nhật dữ liệu trong cache
      dispatch(
        userCoinApi.util.invalidateTags([{ type: "UserCoin", id: "LIST" }])
      );

      refetch();
      onClose();
    } catch (err) {
      console.error("Error updating coin:", err);
    }
  };
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              {/* image */}
              <Image style={styles.image} source={{ uri: course.image }} />

              {/* text */}
              <View style={styles.textPart}>
                <View style={styles.row}>
                  <Text style={styles.title}>{course.name}</Text>
                  <View style={styles.details}>
                    <View
                      style={[styles.detail, { backgroundColor: "#ECF9EF" }]}
                    >
                      <Text style={styles.detailText}>
                        {course.numberOfWords} words
                      </Text>
                    </View>
                    <View
                      style={[styles.detail, { backgroundColor: "#F4F4F5" }]}
                    >
                      <Text style={styles.detailText}>{course.level}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.description} numberOfLines={3}>
                  {course.description}
                </Text>
              </View>

              {/* button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleCoinUpdate(item.price);
                }}
              >
                <Text style={styles.buttonText}>Buy</Text>
                <Text style={styles.buttonText}>{item.price}</Text>
                <FontAwesome6
                  name="coins"
                  size={24}
                  style={{ color: "rgb(243, 207, 5)" }}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    gap: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
  },
});

export default PreviewCourseMenuBuy;
