import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { WordType } from "../../types/WordType";

import LearnByTranslate from './LearnByTranslate';
import LearnByListenAndGuess from './LearnByListenAndGuess';
import PairWord from './PairWord';
import FinishStudy from './FinishStudy';

type PracticeScreenNavigationProp = StackNavigationProp<
    RootStackParamList, "PracticeScreen"
>;
type PracticeScreenRouteParams = {
    words: WordType[]
};

export default function PracticeScreen() {
    const navigation = useNavigation<PracticeScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: PracticeScreenRouteParams }, 'params'>>();
    const { words } = route.params;

    // Define learning sessions
    const [sessions, setSessions] = useState(() => [
        { level: 1, words: words.filter(w => w.level === 1), Component: LearnByTranslate },
        { level: 2, words: words.filter(w => w.level === 2), Component: LearnByListenAndGuess },
        { level: 3, words: words.filter(w => w.level === 3), Component: PairWord },
        { level: 4, words: words.filter(w => w.level === 4), Component: LearnByTranslate },
        { level: 5, words: words.filter(w => w.level === 5), Component: LearnByListenAndGuess },
    ]);

    const [sessionIndex, setSessionIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFinish, setIsFinish] = useState(false);

    const currentSession = sessions[sessionIndex];
    const totalPages = sessions.reduce((sum, session) => sum + session.words.length, 0);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleNextPage = () => {
        const totalWordsBeforeCurrent = sessions
            .slice(0, sessionIndex)
            .reduce((sum, s) => sum + s.words.length, 0);

        const currentSessionWords = currentSession.words.length;
        const lastPageInCurrentSession = totalWordsBeforeCurrent + currentSessionWords - 1;

        if (currentPage < lastPageInCurrentSession) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(currentPage + 1);
            handleNextLevel();
        }
    };

    const handleNextLevel = () => {
        if (sessionIndex < sessions.length - 1) {
            setSessionIndex(prev => prev + 1);
        } else {
            setTimeout(() => { setIsFinish(true) }, 300);
        }
    };

    const handleWrongAnswer = (word: WordType) => {
        setSessions(prev => {
            const newSessions = [...prev];
            newSessions[sessionIndex].words = [...newSessions[sessionIndex].words, word];
            return newSessions;
        });
    };

    const renderView = () => {
        if (currentSession.words.length === 0) {
            handleNextLevel();
            if (sessionIndex === sessions.length - 1) return;
        }

        const { Component, words } = currentSession;

        return (
            <Component
                words={words}
                onNext={handleNextPage}
                onWrongAnswer={handleWrongAnswer}
            />
        );
    };

    if (isFinish) return <FinishStudy onNext={handleGoBack} />;

    return (
        <View style={styles.container}>
            {/* status */}
            <View style={styles.progressBarContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="close" size={24} />
                </TouchableOpacity>
                <ProgressBar
                    progress={currentPage / totalPages}
                    color="#2563EB"
                    style={styles.progressBar}
                />
            </View>

            {/* content */}
            {renderView()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
    },
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
});
