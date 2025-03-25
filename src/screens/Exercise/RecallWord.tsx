import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from 'react-native-paper';
import Icon from '@expo/vector-icons/SimpleLineIcons';

export default function RecallWord() {
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

            {/* buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Forgot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Recalled</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2563EB',
        borderRadius: 50
    },
    buttonText: {
        color: 'white',
    },
});