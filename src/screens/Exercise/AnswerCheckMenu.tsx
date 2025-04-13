import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, } from "react-native";
import Icon2 from '@expo/vector-icons/Ionicons';
import { WordType } from "../../types/WordType";

interface AnswerCheckMenu {
    visible: boolean;
    isCorrect: boolean;
    correctAnswer: WordType;
    onNext: () => void;
};

const AnswerCheckMenu: React.FC<AnswerCheckMenu> = ({ visible, isCorrect, correctAnswer, onNext }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.overlay}>
                <View style={[styles.menuContainer, { backgroundColor: isCorrect ? '#24AE37' : '#EA5654' }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.audioButtonContainer}>
                            <TouchableOpacity style={styles.audioButton}>
                                <Icon2 name="volume-high" size={28} color="#FFB718" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.answerContainer}>
                            <Text style={styles.eng}>{correctAnswer.eng}</Text>
                            <Text style={styles.transcription}>/{correctAnswer.transcription}/</Text>
                            <Text style={styles.vie}>{correctAnswer.vie} ({correctAnswer.type})</Text>
                            <Text style={styles.example}>{correctAnswer.example}</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={onNext} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    menuContainer: {
        height: 330,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    audioButtonContainer: {
        flex: 1,
    },
    audioButton: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: "#dedede",
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRadius: 50,
    },
    answerContainer: {
        flex: 4,
        gap: 12,
    },
    eng: {
        fontSize: 24,
        fontWeight: 500,
        color: 'white',
        letterSpacing: 1,
    },
    transcription: {
        fontSize: 16,
        fontWeight: 300,
        color: 'white',
    },
    vie: {
        fontSize: 16,
        fontWeight: 300,
        color: 'white',
    },
    example: {
        fontSize: 17,
        fontWeight: 400,
        color: 'white',
    },

    continueButton: {
        height: 50,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        borderColor: "#dedede",
        borderWidth: 1,
        borderBottomWidth: 4,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 35,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: 700,
    },
});

export default AnswerCheckMenu;
