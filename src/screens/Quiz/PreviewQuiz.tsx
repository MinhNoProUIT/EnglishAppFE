import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { RadioButton } from "react-native-paper";
import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { QuizType } from "../../types/QuizType";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type PreviewQuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PreviewQuiz"
>;

type PreviewQuizScreenRouteParams = {
    data: QuizType
};

export default function PreviewQuiz() {
    const navigation = useNavigation<PreviewQuizScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: PreviewQuizScreenRouteParams }, 'params'>>();
    const { data } = route.params;

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
                    <AntDesign name='close' size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("CreateEditQuiz", { quizToEdit: data })}>
                    <SimpleLineIcons name="pencil" size={20} color="#FF991F" />
                </TouchableOpacity>
            </View>

            <View style={styles.detail}>
                <Text style={styles.title}>{data.title}</Text>
                <View style={styles.numOfQues}>
                    <Text style={styles.numOfQuesText}>
                        {data.questions.length} questions
                    </Text>
                </View>
            </View>

            {/* questions */}
            <View style={styles.questionsPart}>
                <FlatList
                    style={styles.cardList}
                    data={data.questions}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.question}>
                                <Text style={styles.label}>{index + 1}</Text>
                                <Text>{item.questionText}</Text>
                            </View>
                            {item.options.map((opt, oIdx) => {
                                return (
                                    <View key={oIdx} style={styles.option}>
                                        <RadioButton color='#24AE37' value={oIdx.toString()} disabled />
                                        <Text style={styles.option}>{opt}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                />
            </View>

            {/* button */}
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("DoQuiz", { data: data }) }}>
                <Text style={styles.buttonText}>
                    Start
                </Text>
            </TouchableOpacity>
        </View>
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
        justifyContent: 'space-between',
    },
    closeIcon: {
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
    },
    editButton: {
    },
    detail: {
        gap: 4,
        marginBottom: 10,
    },
    numOfQues: {
        width: 120,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#ECF9EF',
    },
    numOfQuesText: {
        fontSize: 14,
        fontWeight: 500,
    },

    questionsPart: {
        flex: 1,
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
    question: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
    option: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        width: 220,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#2563EB',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#fff'
    },
});

