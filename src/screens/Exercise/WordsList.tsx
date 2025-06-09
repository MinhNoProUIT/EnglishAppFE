import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { ProgressBar } from 'react-native-paper';
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { useGetAllWordsWithProgressQuery } from "../../services/userProgressService";
import { playTTS } from '../../utils/playTTS';

type PracticeScreenRouteParams = {
  course_id: string
};

export default function WordsList() {
  const route = useRoute<RouteProp<{ params: PracticeScreenRouteParams }, 'params'>>();
  const { course_id } = route.params;

  const {
    data: words,
    refetch
  } = useGetAllWordsWithProgressQuery(course_id);

  useEffect(() => {
    if (words) {
      console.log(words)
    }
    else console.log("khong lay duoc tu vung")
  }, [words]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  return (
    <View style={styles.container}>
      {/* list */}
      <FlatList style={styles.wordsList}
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.word}>
              <View style={styles.progressBarContainer}>
                <Text style={styles.progressText}>{item.level}</Text>
                <ProgressBar
                  progress={item.level / 6}
                  color="#FF991F"
                  style={styles.progressBar}
                />
              </View>

              <View style={styles.wordPart}>
                <Text style={styles.wordText}>{item.englishname}</Text>
                <TouchableOpacity style={styles.speakerIcon} onPress={() => playTTS(item.englishname, 1.2)}>
                  <Icon name="volume-2" size={20} color="#2563EB" />
                </TouchableOpacity>
              </View>
              <View style={styles.wordPart}>
                <Text style={styles.wordText}>{item.vietnamesename}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View >
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