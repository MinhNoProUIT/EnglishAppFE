import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import Icon from '@expo/vector-icons/Ionicons';
import AnswerCheckMenu from "./AnswerCheckMenu";
import { WordType } from "../../types/WordType";

export default function LearnByListenAndGuess({ 
    words, 
    onNext, 
    onWrongAnswer 
}: { 
    words: WordType[], 
    onNext: () => void, 
    onWrongAnswer: (word: WordType) => void 
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    const currentWord = words[currentIndex];

    const checkAnswer = () => {
        if (userInput.toLowerCase() === currentWord.eng.toLowerCase()) {
            setIsCorrect(true);
        } else {
            onWrongAnswer(currentWord);
            setIsCorrect(false);
        }
        setShowCheck(true);
    };

    const nextWord = () => {
        setShowCheck(false);
        onNext();
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUserInput("");
            setIsCorrect(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContentContainer}>
                {/* title */}
                <Text style={styles.title}>Nghe và viết lại</Text>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.circleButton, styles.audioButton]}>
                        <Icon name="volume-high" size={40} color="#FFB718" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.circleButton, styles.slowButton]}>
                        <Image style={styles.snailImage}
                            source={require("../../../assets/SnailIcon.png")} />
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

            {/* modal */}
            <AnswerCheckMenu
                visible={showCheck}
                isCorrect={isCorrect}
                correctAnswer={currentWord}
                onNext={nextWord}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingBottom: 20,
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
    snailImage: {
        height: 25,
        width: 25,
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
        bottom: 35,
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