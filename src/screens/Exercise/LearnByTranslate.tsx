import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import AnswerCheckMenu from "./AnswerCheckMenu";
import { Word } from "../../interfaces/WordInterface";

export default function LearnByTranslate({ 
    words, 
    onNext, 
    onWrongAnswer,
    onCorrectAnswer,
}: { 
    words: Word[], 
    onNext: () => void, 
    onWrongAnswer: (word: Word, isPairWord: boolean) => void 
    onCorrectAnswer: (word: Word) => void
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    const currentWord = words[currentIndex]
    const wordLength = currentWord.englishname.length;

    const checkAnswer = () => {
        if (userInput.trim().toLowerCase() === currentWord.englishname.toLowerCase()) {
            onCorrectAnswer(currentWord);
            setIsCorrect(true);
        } else {
            onWrongAnswer(currentWord, false);
            setIsCorrect(false);
        }
        setShowCheck(true);
    };

    const renderInputBoxes = () => {
        return currentWord.englishname.split("").map((_, index) => (
            <View key={index} style={styles.letterBox}>
                <Text style={styles.letter}>{userInput[index] || ""}</Text>
            </View>
        ));
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
                <Text style={styles.title}>Điền từ</Text>

                {/* word */}
                <Text style={styles.word}>{currentWord.vietnamesename} ({currentWord.type})</Text>

                {/* input */}
                {/* Ô nhập có sẵn gạch chân */}
                <View style={styles.inputContainer}>{renderInputBoxes()}</View>

                <TextInput
                    style={[styles.hiddenInput, { width: wordLength * 28 }]}
                    autoCapitalize='none'
                    autoCorrect={false}
                    caretHidden={true}
                    maxLength={wordLength}
                    value={userInput}
                    onChangeText={setUserInput} />
            </View>

            {/* continue button */}
            <TouchableOpacity style={[styles.checkButton, (userInput.length < wordLength) && styles.buttonDisabled]} 
                onPress={checkAnswer} disabled={userInput.length < wordLength}>
                <Text style={[styles.checkButtonText, (userInput.length < wordLength) && styles.buttonDisabledText]}>Kiểm tra</Text>
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
    word: {
        fontSize: 28,
        fontWeight: 700,
        marginTop: 30,
    },

    // input
    inputContainer: {
        flexDirection: 'row',
        height: 70,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#dedede',
        backgroundColor: '#fff',
        marginTop: 50,
        paddingHorizontal: 17,
        paddingVertical: 15,
    },
    hiddenInput: {
        position: "absolute",
        bottom: 0,
        opacity: 0,
        height: 70,
    },
    letterBox: {
        width: 22,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2, // Gạch chân luôn hiển thị
        borderColor: '#949494',
        marginHorizontal: 3,
    },
    letter: {
        fontSize: 22,
        fontWeight: 600,
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