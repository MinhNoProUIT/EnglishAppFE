import React, { useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons, } from '@expo/vector-icons';
import { QuizType, QuizQuestionType } from "../../types/QuizType";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RadioButton } from "react-native-paper";

type CreateEditQuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CreateEditQuiz"
>;

type CreateEditQuizScreenRouteParams = {
    quizToEdit: QuizType
};

export default function CreateQuiz() {
    const navigation = useNavigation<CreateEditQuizScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: CreateEditQuizScreenRouteParams }, 'params'>>();
    const quizToEdit = route.params?.quizToEdit;
    const [quizTitle, setQuizTitle] = useState(quizToEdit?.title ?? '');
    const [questions, setQuestions] = useState(quizToEdit?.questions ?? [{
        id: Date.now(),
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '0',
    }]);

    const addQuestion = () => {
        const newQuestion: QuizQuestionType = {
            id: Date.now(),
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: '0',
        };
        setQuestions(prev => [...prev, newQuestion]);
    };

    const deleteQuestion = (id: number) => {
        const newQuestions = questions.filter(item => item.id !== id);
        setQuestions(newQuestions);
    }

    const updateQuestionText = (index: number, text: string) => {
        const updated = [...questions];
        updated[index].questionText = text;
        setQuestions(updated);
    };

    const updateOption = (qIndex: number, oIndex: number, text: string) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex] = text;
        setQuestions(updated);
    };

    const updateCorrectAnswer = (qIndex: number, text: string) => {
        const updated = [...questions];
        updated[qIndex].correctAnswer = text;
        setQuestions(updated);
    };

    const submitQuiz = () => {
        const quiz: QuizType = {
            id: Date.now(),
            title: quizTitle,
            questions,
        };
        console.log('Quiz saved:', quiz);
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
                    <AntDesign name='close' size={24} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {quizToEdit ? "Chỉnh sửa quiz" : "Tạo quiz"}
                </Text>
                <TouchableOpacity style={styles.saveButton} onPress={submitQuiz}>
                    <FontAwesome name="check" size={26} color="#24AE37" />
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.cardList}
                data={questions}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <View style={[styles.card, styles.titleCard]}>
                        <Text style={styles.titleText}>Quiz Title:</Text>
                        <TextInput value={quizTitle} onChangeText={setQuizTitle} placeholder="Nhập tiêu đề" />
                    </View>
                }
                ListFooterComponent={
                    <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
                        <AntDesign name='plus' color="white" size={24} />
                    </TouchableOpacity>
                }
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardLabelContainer}>
                            <Text style={styles.label}>{index + 1}</Text>
                            {index > 0 &&
                                <TouchableOpacity onPress={() => { deleteQuestion(item.id) }}>
                                    <AntDesign name='close' size={22} color='#ccc' />
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Nhập câu hỏi"
                                value={item.questionText}
                                onChangeText={(text) => updateQuestionText(index, text)}
                            />

                            <RadioButton.Group
                                onValueChange={(value) => updateCorrectAnswer(index, value)}
                                value={item.correctAnswer}
                            >
                                {item.options.map((opt, oIdx) => {
                                    const isCorrect = oIdx.toString() == item.correctAnswer;
                                    return (
                                        <View key={oIdx} style={[styles.optionContainer, isCorrect && styles.correctOption]}>
                                            <View style={styles.optionText}>
                                                <RadioButton color='#24AE37' value={oIdx.toString()} />
                                                <TextInput
                                                    style={styles.optionText}
                                                    placeholder={`Đáp án ${oIdx + 1}`}
                                                    value={opt}
                                                    onChangeText={(text) => updateOption(index, oIdx, text)}
                                                />
                                            </View>
                                            {isCorrect && <MaterialIcons name="done" size={24} color="#24AE37" />}
                                        </View>
                                    )
                                })}
                            </RadioButton.Group>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingVertical: 20,
    },
    headerBar: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    closeIcon: {
    },
    headerText: {
        fontSize: 20,
        fontWeight: 600,
    },
    saveButton: {
    },

    cardList: {
        paddingHorizontal: 15,
    },
    addButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#2563EB',
        marginTop: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 8,
        paddingVertical: 5,
        elevation: 3,
    },
    titleCard: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        borderTopColor: '#2563EB',
        borderTopWidth: 12,
    },
    titleText: {
        fontWeight: 'bold',
    },
    cardLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    label: {
        height: 28,
        width: 28,
        textAlignVertical: 'center',
        textAlign: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#dedede',
        color: '#ccc',
        fontWeight: 'bold',
        fontSize: 12,
    },

    inputContainer: {
        marginHorizontal: 12,
        marginVertical: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 8,
    },
    optionText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    correctOption: {
        backgroundColor: '#e6f4ea',
    },
});
