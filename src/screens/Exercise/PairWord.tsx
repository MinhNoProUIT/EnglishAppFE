import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Word } from "../../interfaces/WordInterface";

export default function PairWord({
    words, 
    onNext, 
    onWrongAnswer,
    onCorrectAnswer,
}: { 
    words: Word[], 
    onNext: () => void, 
    onWrongAnswer: (word: Word, isPairWord: boolean) => void,
    onCorrectAnswer: (word: Word) => void
}) {
    const [shuffledEngWords, setShuffledEngWords] = useState<Word[]>([]);
    const [shuffledVieWords, setShuffledVieWords] = useState<Word[]>([]);
    const [hiddenIds, setHiddenIds] = useState<string[]>([]);
    const [selectedEngId, setSelectedEngId] = useState<string>("");
    const [selectedVieId, setSelectedVieId] = useState<string>("");
    const [correctId, setCorrectId] = useState<string>("");
    const [wrongEngId, setWrongEngId] = useState<string>("");
    const [wrongVieId, setWrongVieId] = useState<string>("");

    // hàm tách thành các nhóm 5 từ
    const group5Words = <Word,>(words: Word[]): Word[][] => {
        const result: Word[][] = [];
        for (let i = 0; i < words.length; i += 5) {
            result.push(words.slice(i, i + 5));
        }
        return result;
    };
    const groups = group5Words(words);
    let currentGroupIndex = 0;
    const [currentGroup, setCurrentGroup] = useState<Word[]>(groups[0]);

    // lấy vị trí ngẫu nhiên
    const shuffleWords = (group: Word[]) => {
        const result = [...group];
        return result.sort(() => Math.random() - 0.5);
    }
    useEffect(() => {
        setShuffledEngWords(shuffleWords(currentGroup));
        setShuffledVieWords(shuffleWords(currentGroup));
    }, [currentGroup]);

    // mỗi khi nối xong 5 từ
    useEffect(() => {
        if (hiddenIds.length === 5) {
            setCurrentGroup(groups[++currentGroupIndex]);
            setTimeout(() => setHiddenIds([]), 600)
        }
    }, [hiddenIds]);

    const handleSelect = (word: Word, column: 'eng' | 'vie') => {
        const nextEngId = column === 'eng' ? word.id : selectedEngId;
        const nextVieId = column === 'vie' ? word.id : selectedVieId;

        if (column === 'eng') {
            setSelectedEngId(word.id);
        } else {
            setSelectedVieId(word.id);
        }

        if (nextEngId === nextVieId) {
            onCorrectAnswer(word);
            setCorrectId(word.id);
            setSelectedEngId("");
            setSelectedVieId("");
            setTimeout(() => {
                setHiddenIds(prev => [...prev, word.id]);
                onNext();
            }, 500);
        } else if (nextEngId.length > 0 && nextVieId.length > 0) {
            onWrongAnswer(word, true);
            setWrongEngId(nextEngId);
            setWrongVieId(nextVieId);
            setSelectedEngId("");
            setSelectedVieId("");
            setTimeout(() => {
                setWrongEngId("");
                setWrongVieId("");
            }, 500);
        }
    };


    return (
        <View style={styles.container}>
            {/* cards */}
            <View style={styles.cardContainer}>
                {/* eng */}
                <View style={styles.cardColumn}>
                    {shuffledEngWords.map((word) => {
                        if (hiddenIds.includes(word.id))
                            return <View key={word.id} style={{ height: '19%' }} />
                        return (
                            <TouchableOpacity
                                key={word.id}
                                style={[
                                    styles.card,
                                    selectedEngId === word.id && styles.selectedCard,
                                    correctId === word.id && styles.correctCard,
                                    wrongEngId === word.id && styles.wrongCard,
                                    hiddenIds.includes(word.id) && { opacity: 0 }
                                ]}
                                onPress={() => handleSelect(word, 'eng')}
                            >
                                <Text style={[
                                    styles.cardText,
                                    (correctId === word.id || wrongEngId === word.id) && styles.cardResultText,
                                ]}>{word.englishname}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {/* viet */}
                <View style={styles.cardColumn}>
                    {shuffledVieWords.map((word) => {
                        if (hiddenIds.includes(word.id)) 
                            return <View key={word.id} style={{ height: '19%' }} />
                        return (
                            <TouchableOpacity
                                key={word.id}
                                style={[
                                    styles.card,
                                    selectedVieId === word.id && styles.selectedCard,
                                    correctId === word.id && styles.correctCard,
                                    wrongVieId === word.id && styles.wrongCard,
                                ]}
                                onPress={() => handleSelect(word, 'vie')}
                            >
                                <Text style={[
                                    styles.cardText,
                                    (correctId === word.id || wrongVieId === word.id) && styles.cardResultText,
                                ]}>{word.vietnamesename}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
        gap: 10,
    },

    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    cardColumn: {
        flex: 1,
        gap: 8,
    },
    card: {
        height: '19%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    selectedCard: {
        backgroundColor: '#ddd',
    },
    correctCard: {
        backgroundColor: '#24AE37',
    },
    wrongCard: {
        backgroundColor: '#EA5654',
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
    },
    cardResultText: {
        color: 'white',
        fontWeight: 500,
    },
});