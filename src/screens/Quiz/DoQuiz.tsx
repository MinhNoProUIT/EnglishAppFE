import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import { QuizQuestionResultType, QuizResultType, QuizType } from "../../types/QuizType";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type DoQuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "DoQuiz"
>;

type DoQuizScreenRouteParams = {
    data: QuizType
};

export default function DoQuiz() {
    const navigation = useNavigation<DoQuizScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: DoQuizScreenRouteParams }, 'params'>>();
    const { data } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [isContinuable, setIsContinuable] = useState(false);
    const [questionsResult, setQuestionsResult] = useState<QuizQuestionResultType[]>([]);
    const [score, setScore] = useState(0);

    const result: QuizResultType = {
        ...data,
        questions: questionsResult,
        score: score,
    };
    const questions = data.questions;
    const currentQuestion = questions[currentIndex];

    const handleNext = () => {
        const resultScore = score + (selectedOption == currentQuestion.correctAnswer ? 1 : 0);
        const newQuestionResult: QuizQuestionResultType = {
            ...currentQuestion,
            selectedAnswer: selectedOption
        };
        const UpdatedQuizQuestionsResult = [...questionsResult, newQuestionResult];
        const UpdatedQuizResult = {
            ...result,
            questions: UpdatedQuizQuestionsResult,
            score: resultScore
        };

        if (currentIndex < questions.length - 1) {
            setQuestionsResult(UpdatedQuizQuestionsResult);
            setScore(resultScore);
            setCurrentIndex(currentIndex + 1);
            setSelectedOption('');
            setIsContinuable(false);
        }
        else {
            navigation.navigate("FinishQuiz", { resultData: UpdatedQuizResult })
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
                    progress={currentIndex / questions.length}
                    color="#2563EB"
                    style={styles.progressBar}
                />
            </View>

            {/* question */}
            <View style={styles.questionContainer}>
                <View style={styles.question}>
                    <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
                </View>

                <View style={styles.optionContainer}>
                    {currentQuestion.options.map((opt, oIdx) => {
                        const isSelected = oIdx.toString() == selectedOption;
                        return (
                            <TouchableOpacity
                                key={oIdx}
                                style={[styles.option, isSelected && styles.selectedOption]}
                                onPress={() => {
                                    setSelectedOption(oIdx.toString());
                                    setIsContinuable(true)
                                }}
                            >
                                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{opt}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            {/* continue button */}
            <TouchableOpacity style={[styles.continueButton, !isContinuable && styles.buttonDisabled]} onPress={handleNext} disabled={!isContinuable}>
                <Text style={[styles.continueButtonText, !isContinuable && styles.buttonDisabledText]}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 35,
        paddingBottom: 25,
        paddingHorizontal: 20,
        gap: 25,
    },

    // progress bar
    progressBarContainer: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBar: {
        height: 20,
        width: 340,
        borderRadius: 10,
    },

    questionContainer: {
        flex: 1,
        width: "100%",
        gap: 10,
    },
    question: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: "#dedede",
        borderWidth: 1,
        borderBottomWidth: 5,
        borderRadius: 12,
    },
    questionText: {
        fontSize: 24
    },
    optionContainer: {
        flex: 1,
        gap: 10,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: "#dedede",
        borderWidth: 1,
        borderBottomWidth: 5,
        borderRadius: 10,
    },
    optionText: {
        fontSize: 20,
    },
    selectedOption: {
        borderColor: "#2563EB",
    },
    selectedOptionText: {
        color: "#2563EB",
    },

    // continue button
    continueButton: {
        height: 50,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#2563EB',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
    buttonDisabled: {
        backgroundColor: "#dedede",
    },
    buttonDisabledText: {
        color: 'gray',
    }
});