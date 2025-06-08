import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetAllQuizQuery } from '../../services/quizService';

type CreateQuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CreateEditQuiz"
>;

{/*
const quizzes: QuizType[] = [
    {
        id: 1,
        title: "Present Simple Tense",
        questions: [
            {
                id: 1,
                questionText: "She ___ to school every day.",
                options: ["go", "goes", "going", "gone"],
                correctAnswer: "1",
            },
            {
                id: 2,
                questionText: "They ___ coffee in the morning.",
                options: ["drink", "drinks", "drinking", "drank"],
                correctAnswer: "0",
            },
            {
                id: 3,
                questionText: "Which one is correct?",
                options: [
                    "He work hard.",
                    "She working every day.",
                    "I works at home.",
                    "We play football on weekends.",
                ],
                correctAnswer: "3",
            },
        ],
    },
    {
        id: 2,
        title: "English Vocabulary: Food",
        questions: [
            {
                id: 1,
                questionText: "Which one is a fruit?",
                options: ["Potato", "Carrot", "Banana", "Onion"],
                correctAnswer: "2",
            },
            {
                id: 2,
                questionText: "What do cows produce?",
                options: ["Water", "Milk", "Juice", "Butter"],
                correctAnswer: "1",
            },
            {
                id: 3,
                questionText: "Which food is spicy?",
                options: ["Chili", "Cake", "Apple", "Rice"],
                correctAnswer: "0",
            },
            {
                id: 4,
                questionText: "Which food is sweet?",
                options: ["Chili", "Cake", "Apple", "Rice"],
                correctAnswer: "1",
            },
        ],
    },
    {
        id: 3,
        title: "Past Tense Basics",
        questions: [
            {
                id: 1,
                questionText: "He ___ a book yesterday.",
                options: ["reads", "read", "reading", "readed"],
                correctAnswer: "1",
            },
            {
                id: 2,
                questionText: "They ___ to Paris last summer.",
                options: ["go", "went", "gone", "goes"],
                correctAnswer: "1",
            },
            {
                id: 3,
                questionText: "Choose the correct sentence:",
                options: [
                    "I writed a letter.",
                    "She sleeped early.",
                    "He ate an apple.",
                    "We goes shopping.",
                ],
                correctAnswer: "2",
            }
        ],
    },
    {
        id: 4,
        title: "Common English Adjectives",
        questions: [
            {
                id: 1,
                questionText: "Which word means the opposite of 'happy'?",
                options: ["sad", "glad", "joyful", "excited"],
                correctAnswer: "0",
            },
            {
                id: 2,
                questionText: "What is the adjective in this sentence: 'The tall man walked in'?",
                options: ["man", "walked", "tall", "in"],
                correctAnswer: "2",
            },
            {
                id: 3,
                questionText: "'Hot' is to 'cold' as 'fast' is to ___?",
                options: ["run", "slow", "speed", "quick"],
                correctAnswer: "1",
            }
        ],
    },
    {
        id: 5,
        title: "Everyday English Phrases",
        questions: [
            {
                id: 1,
                questionText: "What does 'How are you?' mean?",
                options: [
                    "Where are you?",
                    "How old are you?",
                    "How do you feel?",
                    "What do you want?",
                ],
                correctAnswer: "2",
            },
            {
                id: 2,
                questionText: "Which phrase is used to say goodbye?",
                options: ["Hello", "Good morning", "See you later", "Thank you"],
                correctAnswer: "3",
            },
            {
                id: 3,
                questionText: "Which one is a polite expression?",
                options: ["Give me that!", "Thanks a lot", "What?!", "Move!"],
                correctAnswer: "1",
            }
        ],
    }
];
*/}

export default function Quizzes() {
    const {
        data: quizzes,
        refetch,
    } = useGetAllQuizQuery();

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );
    const navigation = useNavigation<CreateQuizScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Quiz</Text>
            </View>

            {/* list quizzes */}
            <FlatList
                style={styles.quizzesList}
                data={quizzes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.detail}>
                                <SimpleLineIcons name="book-open" size={12} />
                                <Text style={styles.detailText}>Total question: {item.total_questions}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.learnButton}
                            onPress={() => { navigation.navigate("PreviewQuiz", { quizToPreview: item }) }}>
                            <SimpleLineIcons name="arrow-right" size={14} color='white' />
                        </TouchableOpacity>
                    </View>
                )}
            />
            {/* button */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateEditQuiz")}>
                <AntDesign name='plus' color="white" size={24} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 40,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 4,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#263038'
    },
    quizzesList: {
        paddingVertical: 12,
        paddingHorizontal: 18,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        backgroundColor: "#fff",
        borderColor: "#F3F3F5",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 18,
        marginBottom: 8,
    },
    cardContent: {
        gap: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: 500,
    },
    detail: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    detailText: {
        fontSize: 9.5,
        color: "#515960",
    },
    learnButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2563EB',
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2563EB',
    },
});
