import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons, } from '@expo/vector-icons';
import { QuizResultType } from "../../types/QuizType";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type FinishQuizScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "FinishQuiz"
>;

type FinishQuizScreenRouteParams = {
    resultData: QuizResultType
};

export default function FinishQuiz() {
    const navigation = useNavigation<FinishQuizScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: FinishQuizScreenRouteParams }, 'params'>>();
    const { resultData } = route.params;
    const [fill, setFill] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFill(resultData.score / resultData.questions.length * 100);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.circleWrapper}>
                    <AnimatedCircularProgress
                        size={180}
                        width={30}
                        fill={fill}
                        tintColor="#2563EB"
                        backgroundColor="#eee"
                        rotation={0}
                        duration={2000}
                    >
                        {(f) => <Text style={styles.percentage}>{Math.round(f)}%</Text>}
                    </AnimatedCircularProgress>
                </View>

                <Text style={styles.contentText}>
                    Bạn đã trả lời đúng {resultData.score}/{resultData.questions.length} câu
                </Text>

                <Text style={styles.contentText}>
                    Keep on practicing!
                </Text>
            </View>

            {/* button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ReviewFinishQuizResult", { resultData: resultData })}>
                    <Text style={styles.buttonText}>Xem lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.popToTop()}>
                    <Text style={styles.buttonText}>Thoát</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 35,
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
    },
    circleWrapper: {
        width: 180,
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 60,
    },
    percentage: {
        position: "absolute",
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFA500",
    },
    contentText: {
        fontSize: 22,
        color: "#FFA500",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 20,
    },

    // button
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        gap: 10,
    },
    button: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#2563EB',
        borderWidth: 1,
    },
    buttonText: {
        color: '#2563EB',
        fontSize: 16,
        fontWeight: 500,
    },
});
