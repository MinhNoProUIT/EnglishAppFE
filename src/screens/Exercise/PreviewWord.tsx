import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/SimpleLineIcons';

export default function PreviewWord() {
    return (
        <View style={styles.container}>
            {/* status */}
            <ProgressBar
                progress={5 / 20}
                color="#2563EB"
                style={{ height: 2, borderRadius: 10, marginHorizontal: 5 }}
            />

            {/* cards */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.wordText}>hello</Text>
                    <TouchableOpacity style={styles.speakerIcon}>
                        <Icon name="volume-2" size={22} color="#ddd" />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.wordText}>xin chào</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
    },
    cardContainer: {
        flex: 1,
        gap: 8,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    wordText: {
        fontSize: 25
    },
    speakerIcon: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});