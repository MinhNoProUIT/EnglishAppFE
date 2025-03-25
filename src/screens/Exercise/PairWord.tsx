import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from 'react-native-paper';

export default function PairWord() {
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
                {/* viet */}
                <View style={styles.cardColumn}>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>xin chào</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>bạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>lớn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>nhỏ</Text>
                    </TouchableOpacity>
                </View>

                {/* eng */}
                <View style={styles.cardColumn}>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>big</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>you</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>hello</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>I</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.wordText}>small</Text>
                    </TouchableOpacity>
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
        flexDirection: 'row',
        gap: 8,
    },
    cardColumn: {
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
        fontSize: 20
    },
});