import React from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from '@expo/vector-icons/AntDesign';
import Icon2 from '@expo/vector-icons/SimpleLineIcons';
interface CourseMenuProps {
    visible: boolean;
    onClose: () => void;
}

const course =
{
    id: "1",
    name: "In Court",
    level: "A1 - A2",
    numberOfWords: "30",
    description: "Describe some thing about this course. People will learn words about some topic from this course.",
    image: "https://picsum.photos/200/300",
};

const PreviewCourseMenu: React.FC<CourseMenuProps> = ({ visible, onClose, }) => {
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
                                    <Text style={styles.title}>
                                        {course.name}
                                    </Text>
                                    <View style={styles.details}>
                                        <View style={[styles.detail, { backgroundColor: '#ECF9EF' }]}>
                                            <Text style={styles.detailText}>
                                                {course.numberOfWords} words
                                            </Text>
                                        </View>
                                        <View style={[styles.detail, { backgroundColor: '#F4F4F5' }]}>
                                            <Text style={styles.detailText}>
                                                {course.level}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.description}>
                                    {course.description}
                                </Text>
                            </View>

                            {/* button */}
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Start
                                </Text>
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
        alignItems: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
    },
    details: {
        flexDirection: 'row',
        gap: 10,
    },
    detail: {
        width: 70,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    detailText: {
        fontSize: 14,
        fontWeight: 500,
    },
    description: {
        textAlign: 'justify',
        fontSize: 14,
        fontWeight: 400,
        color: '#A8ACAF',
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2563EB',
        position: 'absolute',
        bottom: 22,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#fff'
    },
});

export default PreviewCourseMenu;
