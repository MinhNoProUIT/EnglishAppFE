import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import Icon2 from '@expo/vector-icons/Ionicons';
import Icon3 from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

const words = [
    {
        id: "1",
        eng: 'student',
        vie: 'học sinh, sinh viên',
        transcription: "'stu:dnt",
        type: 'n',
        example: 'His younger sister is a student at that university.',
        image: "https://picsum.photos/200/300",
    },
    {
        id: "2",
        eng: 'teacher',
        vie: 'giáo viên',
        transcription: "'tēCHər",
        type: 'n',
        example: 'His mother is a teacher at that university.',
        image: "https://picsum.photos/200/100",
    },
    {
        id: "3",
        eng: 'school',
        vie: 'trường học',
        transcription: "sko͞ol",
        type: 'n',
        example: 'Students go to school',
        image: "https://picsum.photos/200/400",
    },
];

export default function LearnByListenAndGuess() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const navigation = useNavigation();

    const currentWord = words[currentIndex];

    const checkAnswer = () => {
        if (userInput.toLowerCase() === currentWord.eng.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserInput("");
            setIsCorrect(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* status */}
            <View style={styles.progressBarContainer}>
                <TouchableOpacity>
                    <Icon name='close' size={24} onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <ProgressBar
                    progress={(currentIndex + 1) / words.length}
                    color="#2563EB"
                    style={styles.progressBar}
                />
            </View>

            <View style={styles.mainContentContainer}>
                {/* title */}
                <Text style={styles.title}>Nghe và viết lại</Text>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.circleButton, styles.audioButton]}>
                        <Icon2 name="volume-high" size={40} color="#FFB718" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.circleButton, styles.slowButton]}>
                        <Icon3 name="snail" size={28} color="#FF991F" />
                    </TouchableOpacity>
                </View>

                {/* input */}
                <TextInput 
                    style={styles.input}
                    placeholder='Gõ lại từ bạn nghe được'
                    placeholderTextColor={'gray'}
                    autoCapitalize='none'
                    value={userInput}
                    onChangeText={setUserInput} />
            </View>

            {/* continue button */}
            <TouchableOpacity style={[styles.checkButton, !userInput && styles.buttonDisabled]} onPress={checkAnswer} disabled={!userInput}>
                <Text style={[styles.checkButtonText, !userInput && styles.buttonDisabledText]}>Kiểm tra</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingVertical: 20,
    },
    // progress bar
    progressBarContainer: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    progressBar: {
        height: 20,
        width: 340,
        borderRadius: 10,
    },

    //circle buttons
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        gap: 20,
    },
    circleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: "#dedede",
        borderWidth: 1,
        borderRadius: 50,
    },
    audioButton: {
        height: 80,
        width: 80,
        borderBottomWidth: 5,
    },
    slowButton: {
        height: 55,
        width: 55,
        borderBottomWidth: 4,
    },


    // content
    mainContentContainer: {
        marginTop: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        color: 'gray',
    },
    input: {
        height: 60,
        width: '90%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#dedede',
        backgroundColor: '#fff',
        marginTop: 40,
        padding: 15,
        fontSize: 16,
        fontWeight: 500,
    },

    // check button
    checkButton: {
        height: 50,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#2563EB',
        position: 'absolute',
        bottom: 25,
    },
    checkButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
    buttonDisabled: {
        backgroundColor: "#dedede", // Màu nhạt hơn khi chưa nhập đáp án
    },
    buttonDisabledText: {
        color: 'gray',
    }
});