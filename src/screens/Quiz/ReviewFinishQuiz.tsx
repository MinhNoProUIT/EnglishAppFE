import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons, } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RadioButton } from "react-native-paper";

type ReviewFinishQuizResultScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ReviewFinishQuizResult"
>;

export default function ReviewFinishQuizResult() {
    const navigation = useNavigation<ReviewFinishQuizResultScreenNavigationProp>();
        const route = useRoute<RouteProp<RootStackParamList, "ReviewFinishQuizResult">>();
    const { resultData } = route.params;

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.popTo("MainTabs")}>
                    <AntDesign name='close' size={24} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Kết quả: </Text>
                <Text style={[styles.headerText, { color: 'red' }]}>
                    {resultData.score}/{resultData.questions.length}
                </Text>
            </View>

            {/* questions */}
            <FlatList
                style={styles.cardList}
                data={resultData.questions}
                //keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <View style={[styles.card, styles.titleCard]}>
                        <Text>Quiz Title:</Text>
                        <Text style={styles.titleText}>{resultData.title}</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.question}>
                            <Text style={styles.label}>{index + 1}</Text>
                            <Text>{item.question_text}</Text>
                        </View>
                        {item.options.map((opt, oIdx) => {
                            const isCorrect = oIdx.toString() == item.correct_answer;
                            const isSelected = oIdx.toString() == item.selectedAnswer;
                            return (
                                <View key={oIdx} style={[
                                    styles.optionContainer,
                                    isCorrect && styles.correctOption,
                                    !isCorrect && isSelected && styles.wrongOption,
                                ]}>
                                    <View style={styles.option}>
                                        {isCorrect ?
                                            <MaterialIcons name="radio-button-checked" size={24} color="#24AE37" />
                                            : isSelected ?
                                                <MaterialIcons name="radio-button-checked" size={24} color="#ff3e3e" />
                                                :
                                                <MaterialIcons name="radio-button-unchecked" size={24} color="#bdbcbe" />
                                        }
                                        <Text>{opt}</Text>
                                    </View>
                                    {isCorrect && <MaterialIcons name="done" size={24} color="#24AE37" />}
                                    {!isCorrect && isSelected && <MaterialIcons name="close" size={24} color="#ca3120" />}
                                </View>
                            )
                        })}
                    </View>
                )}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 35,
        paddingBottom: 25,
        paddingHorizontal: 20,
        gap: 15,
    },
    headerBar: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        position: 'absolute',
        left: 0,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 600,
    },

    cardList: {
        padding: 2,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 16,
        padding: 5,
        elevation: 3,
    },
    titleCard: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        borderTopColor: '#2563EB',
        borderTopWidth: 12,
        gap: 5,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },


    question: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5,
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
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        gap: 8,
    },
    optionText: {
    },
    correctOption: {
        backgroundColor: '#e6f4ea',
    },
    wrongOption: {
        backgroundColor: '#ffe9e9',
    }
});
