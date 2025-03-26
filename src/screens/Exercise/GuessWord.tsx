import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from 'react-native-paper';

export default function GuessWord() {
    return (
        <View style={styles.container}>
            {/* status */}
            <View style={styles.statusbar}>
                <View style={styles.status}>
                    <ProgressBar
                        progress={0.5}
                        color="#2563EB"
                        style={{ height: 6, width: 50, borderRadius: 10 }}
                    />
                    <Text style={styles.statusText}>50%</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.status}>
                    <Text style={styles.statusText}>5</Text>
                    <Text style={[styles.statusText, { color: 'gray' }]}>/</Text>
                    <Text style={[styles.statusText, { color: 'gray' }]}>20</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.status}>
                    <Text style={[styles.statusText, { color: '#FF991F' }]}> box - 3</Text>
                </View>
            </View>
            <ProgressBar
                progress={5 / 20}
                color="#2563EB"
                style={{ height: 2, borderRadius: 10, marginHorizontal: 5 }}
            />

            {/* cards */}
            <View style={styles.cardContainer}>
                <View style={styles.question}>
                    <Text style={styles.questionText}>Tốt</Text>
                </View>
                <TouchableOpacity style={styles.choice}>
                    <Text style={styles.choiceText}>Nice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice}>
                    <Text style={styles.choiceText}>Wonderful</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.choice}>
                    <Text style={styles.choiceText}>Incredible</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice}>
                    <Text style={styles.choiceText}>Amazing</Text>
                </TouchableOpacity>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10,
    },
    statusbar: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        elevation: 3,
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: "#ddd",
    },
    statusText: {
        fontSize: 14,
        color: "#2563EB",
    },

    cardContainer: {
        flex: 1,
        gap: 8,
    },
    question: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    questionText: {
        fontSize: 26
    },
    choice: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    choiceText: {
        fontSize: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#2563EB'
    },
    buttonText: {
        color: 'white', 
        fontSize: 16
    }
});