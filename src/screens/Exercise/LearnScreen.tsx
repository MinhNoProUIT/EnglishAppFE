import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { WordType } from "../../types/WordType";

import LearnByFlashcard from './LearnByFlashcard';
import LearnByTranslate from './LearnByTranslate';
import LearnByListenAndGuess from './LearnByListenAndGuess';
import FinishStudy from './FinishStudy';
import PairWord from './PairWord';

type LearnScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "LearnScreen"
>;

type LearnScreenRouteParams = {
    words: WordType[];
    firstStep: number;
};

export default function LearnScreen() {
    const navigation = useNavigation<LearnScreenNavigationProp>();
    const route = useRoute<RouteProp<{ params: LearnScreenRouteParams }, 'params'>>();
    const { words, firstStep } = route.params;
    const [currentPage, setCurrentPage] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    const totalPages = words.length * (4 - firstStep);
    const currentStep = (currentPage - currentPage % words.length) / words.length + firstStep;

    const handleGoBack = () => {
        navigation.goBack();
    }
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
        else {
            setCurrentPage(currentPage + 1);
            setTimeout(() => { setIsFinish(true) }, 300);
        }
    };

    const renderStepView = () => {
        switch (currentStep) {
            case 0:
                return <LearnByFlashcard words={words} onNext={handleNext} />;
            case 1:
                return <LearnByTranslate words={words} onNext={handleNext} />;
            case 2:
                return <LearnByListenAndGuess words={words} onNext={handleNext} />;
            case 3:
                return <PairWord words={words} onNext={handleNext} />
            default:
                return null;
        }
    };

    if (isFinish) return <FinishStudy onNext={handleGoBack} />;
    else return (
        <View style={styles.container}>
            {/* status */}
            <View style={styles.progressBarContainer}>
                <TouchableOpacity>
                    <Icon name='close' size={24} onPress={handleGoBack} />
                </TouchableOpacity>
                <ProgressBar
                    progress={currentPage / totalPages}
                    color="#2563EB"
                    style={styles.progressBar}
                />
            </View>

            {/* content */}
            {renderStepView()}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 20,
    },
    // progress bar
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
