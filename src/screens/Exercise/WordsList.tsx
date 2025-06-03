import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { ProgressBar } from 'react-native-paper';
import { RouteProp, useRoute } from "@react-navigation/native";
import { WordType } from "../../types/WordType";

type PracticeScreenRouteParams = {
  words: WordType[]
};

export default function WordsList() {
  const route = useRoute<RouteProp<{ params: PracticeScreenRouteParams }, 'params'>>();
  const { words } = route.params;
  return (
    <View style={styles.container}>
      {/* list */}
      <FlatList style={styles.wordsList}
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.word}>
            <View style={styles.progressBarContainer}>
              <Text style={styles.progressText}>{item.level}</Text>
              <ProgressBar
                progress={item.level / 5}
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