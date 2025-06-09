import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation, RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

import LearnByTranslate from './LearnByTranslate';
import LearnByListenAndGuess from './LearnByListenAndGuess';
import PairWord from './PairWord';
import FinishStudy from './FinishStudy';
import { useGetAllCompletedWordsByCourseQuery, useGetAllTodayRepeatWordsQuery, useUpdateUserProgressMutation } from '../../services/userProgressService';
import { Word, UserProgressWithWord } from '../../interfaces/WordInterface';

type PracticeScreenNavigationProp = StackNavigationProp<
    RootStackParamList, "PracticeScreen"
>;

export default function PracticeScreen() {
    const navigation = useNavigation<PracticeScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, "PracticeScreen">>();
    const { course_id, toCheckCompleted, onFinish } = route.params;
    const { data, refetch } = toCheckCompleted
        ? useGetAllCompletedWordsByCourseQuery(course_id)
        : useGetAllTodayRepeatWordsQuery(course_id);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const [score, setScore] = useState(0);
    const [words, setWords] = useState<UserProgressWithWord[]>([]);
    const [sessions, setSessions] = useState<{
        level: number;
        words: Word[];
        Component: any;
        retryMap: { [wordId: string]: number };
    }[]>([]);
    const [sessionIndex, setSessionIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        if (data) {
            console.log(data)
            setWords(data);
            const newSessions = toCheckCompleted ? [{
                level: 6,
                words: data.map(wp => wp.words),
                Component: PairWord,
                retryMap: {},
            }] : [1, 2, 3, 4, 5].map(level => {
                const levelWords = data
                    .filter(w => w.level === level)
                    .map(wp => wp.words);
                const retryMap: { [wordId: string]: number } = {};
                levelWords.forEach(word => {
                    retryMap[word.id.toString()] = 0;
                });
                let Component;
                switch (level) {
                    case 1:
                        Component = LearnByTranslate;
                        break;
                    case 2:
                        Component = LearnByListenAndGuess;
                        break;
                    case 3:
                        Component = PairWord;
                        break;
                    case 4:
                        Component = LearnByTranslate;
                        break;
                    case 5:
                        Component = LearnByListenAndGuess;
                        break;
                }
                return {
                    level,
                    words: levelWords,
                    Component,
                    retryMap
                };
            });
            setSessions(newSessions);
        }
        else console.log("khong lay duoc tu vung")
    }, [data]);

    const currentSession = sessions[sessionIndex];
    const totalPages = sessions.reduce((sum, session) => sum + session.words.length, 0);

    useEffect(() => {
        if (sessions.length > 0 && currentSession?.words.length === 0) {
            handleNextLevel();
        }
    }, [sessionIndex, sessions]);

    const handleGoBack = () => {
        onFinish();
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

    const handleWrongAnswer = (word: Word, isPairWord: boolean) => {
        setSessions(prev => {
            const newSessions = [...prev];
            const session = newSessions[sessionIndex];
            if (!isPairWord) session.words = [...session.words, word];

            const id = word.id.toString();
            session.retryMap[id] = (session.retryMap[id] || 0) + 1;

            return newSessions;
        });
    };

    const [updateUserProgress] = useUpdateUserProgressMutation();
    const handleCorrectAnswer = async (word: Word) => {
        const session = sessions[sessionIndex];
        const retryCount = session.retryMap[word.id.toString()] || 0;
        if (retryCount == 0) setScore(pre => pre + 1);
        console.log(score)
        if (toCheckCompleted) return;
        try {
            await updateUserProgress({
                word_id: word.id,
                body: {
                    isCorrect: true,
                    isRetry: retryCount > 0
                }
            }).unwrap();
        } catch (error) {
            console.error("Update user progress failed:", error);
        }
    };

    const renderView = () => {
        if (!currentSession || currentSession.words.length === 0) return null;

        const { Component, words } = currentSession;

        return (
            <Component
                words={words}
                onNext={handleNextPage}
                onWrongAnswer={handleWrongAnswer}
                onCorrectAnswer={handleCorrectAnswer}
            />
        );
    };

    if (isFinish) {
        return <FinishStudy onNext={handleGoBack} score={score} total={words.length} />;
    }

    return (
        <View style={styles.container}>
            {/* status */}
            <View style={styles.progressBarContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="close" size={24} />
                </TouchableOpacity>
                <ProgressBar
                    progress={totalPages > 0 ? currentPage / totalPages : 0}
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
