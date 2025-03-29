import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { ProgressBar } from 'react-native-paper';

const list = [
    { id: '1', vie: 'xin chào', eng: 'hello', level: 1 },
    { id: '2', vie: 'tôi', eng: 'I', level: 5  },
    { id: '3', vie: 'bạn', eng: 'you' , level: 2 },
    { id: '4', vie: 'căn nhà', eng: 'house', level: 3  },
    { id: '5', vie: 'con thỏ', eng: 'rabbit', level: 1  },
    { id: '6', vie: 'con mèo', eng: 'cat' , level: 4 },
]

export default function WordsList() {
    return (
        <View style={styles.container}>
            {/* list */}
            <FlatList style={styles.wordsList}
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.word}>
                        <View style={styles.progressBarContainer}>
                            <Text style={styles.progressText}>{item.level}</Text>                            
                            <ProgressBar
                                progress={item.level / 7}
                                color="#FF991F"
                                style={styles.progressBar}
                            />
                        </View>

                        <View style={styles.wordPart}>
                            <Text style={styles.wordText}>{item.eng}</Text>
                            <TouchableOpacity style={styles.speakerIcon}>
                                <Icon name="volume-2" size={20} color="#2563EB" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.wordPart}>
                            <Text style={styles.wordText}>{item.vie}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        gap: 10,
    },
    wordsList: {
        flex: 1,
    },
    word: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 15,
    },
    wordPart: {
        flex: 1,
    },
    wordText: {
        fontSize: 16,
        fontWeight: 500,
    },
    speakerIcon: {
        position: "absolute",
        marginTop: 3,
        right: 15,
    },
    progressBarContainer: {
        alignItems: 'center',
        height: 55,
    },
    progressText: {
        fontSize: 10,
        color: 'gray',
        marginBottom: 15,
    },
    progressBar: {
        width: 30,
        height: 4,
        borderRadius: 50,
        transform: [{ rotate: "-90deg" }],
    }
});