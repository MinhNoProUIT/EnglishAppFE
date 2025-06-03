import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from '@expo/vector-icons/AntDesign';
import Icon2 from '@expo/vector-icons/SimpleLineIcons';
import { CourseType } from "../../types/CourseType";

interface CourseMenuProps {
  visible: boolean;
  onClose: () => void;
  onLearn: () => void;
  onRepeat: () => void;
  onReview: () => void;
  selectedCourse: CourseType;
}

const CourseDetailMenu: React.FC<CourseMenuProps> = ({ visible, onClose, onLearn, onRepeat, onReview, selectedCourse }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              {/* Learn */}
              <TouchableOpacity style={styles.option} onPress={onLearn} disabled={selectedCourse.remainWords ? false : true}>
                <Icon name='playcircleo' size={35} color="#2563EB" />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Learn</Text>
                  <Text style={styles.subText}>{selectedCourse.remainWords} new words</Text>
                </View>
              </TouchableOpacity>

              {/* Repeat */}
              <TouchableOpacity style={styles.option} onPress={onRepeat} disabled={selectedCourse.ongoingWords ? false : true}>
                <Icon name="sync" size={35} color="orange" />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Repeat</Text>
                  <Text style={styles.subText}>Repeat {selectedCourse.ongoingWords} words</Text>
                </View>
              </TouchableOpacity>

              {/* Repeat completed words */}
              {selectedCourse.completedWords ?
                <TouchableOpacity style={styles.option} onPress={onRepeat} disabled={selectedCourse.completedWords ? false : true}>
                  <Icon name="sync" size={35} color="#24AE37" />
                  <View style={styles.textContainer}>
                    <Text style={styles.optionText}>Check learned words</Text>
                    <Text style={styles.subText}>{selectedCourse.completedWords} words</Text>
                  </View>
                </TouchableOpacity>
                : null
              }
              {/* Review Words */}
              <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={onReview}>
                <Icon2 name="book-open" size={35} color="gray" />
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Review words</Text>
                </View>
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
    backgroundColor: "#fff",
    width: 275,
    borderRadius: 20,
    elevation: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    marginLeft: 25,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#777",
  },
});

export default CourseDetailMenu;
