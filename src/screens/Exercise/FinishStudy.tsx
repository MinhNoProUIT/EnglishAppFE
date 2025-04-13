import React, { useState } from "react";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";


export default function FinishStudy({ onNext }: { onNext: () => void }) {
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={require("../../../assets/KeepOn.png")} />
            <TouchableOpacity style={styles.continueButton} onPress={onNext}>
                <Text style={styles.continueButtonText} >Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
    },
    continueButton: {
        height: 50,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#2563EB',
        position: 'absolute',
        bottom: 35,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 700,
    },
});