import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  Switch,
} from "react-native";
import { Slider } from "@react-native-assets/slider";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../../locales";
import AsyncStorage from "@react-native-async-storage/async-storage";

const languageOptions = [
  {
    name: "Tiếng Việt",
    code: "VN",
    flag: require("../../../../assets/Vietnam_flag.webp"),
  },
  {
    name: "English",
    code: "EN",
    flag: require("../../../../assets/england_flag.png"),
  },
];

const storeLanguage = async (languageName: string) => {
  try {
    await AsyncStorage.setItem("@language", languageName);
  } catch (e) {
    console.error("Error saving language", e);
  }
};

const AnotherSetting = () => {
  const [backgroundMusicValue, setBackgroundMusicValue] = useState(50);
  const [musicValue, setMusicValue] = useState(50);
  const [selectedLanguage, setSelectedLanguage] = useState("Tiếng Việt");
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const { t } = useTranslation();

  const getLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("@language");
      if (savedLanguage !== null) {
        setSelectedLanguage(savedLanguage); // Set lại ngôn ngữ từ AsyncStorage
        changeLanguage(savedLanguage === "Tiếng Việt" ? "vi" : "en");
      }
    } catch (e) {
      console.error("Error loading language", e);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSelectLanguage = (language: any) => {
    setSelectedLanguage(language.name);
    setShowLanguageList(false);
    storeLanguage(language.name);

    changeLanguage(language.code === "VN" ? "vi" : "en");
  };
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#E0E0E0",
          height: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            width: 200,
          }}
        >
          {t("HUAT")}
        </Text>
        <Slider
          style={{ flex: 1 }}
          value={musicValue}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={setMusicValue}
          trackHeight={10}
          thumbSize={24}
          minimumTrackTintColor="#3E87F6"
          maximumTrackTintColor="#E0E0E0"
          thumbStyle={{
            backgroundColor: "#3E87F6",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#fff",
          }}
          trackStyle={{
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#E0E0E0",
          height: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            width: 200,
          }}
        >
          {t("NN")}
        </Text>
        <Slider
          style={{ flex: 1 }}
          value={backgroundMusicValue}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={setBackgroundMusicValue}
          trackHeight={10}
          thumbSize={24}
          minimumTrackTintColor="#3E87F6"
          maximumTrackTintColor="#E0E0E0"
          thumbStyle={{
            backgroundColor: "#3E87F6",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#fff",
          }}
          trackStyle={{
            borderRadius: 10,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#E0E0E0",
          height: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            width: 200,
          }}
        >
          {" "}
          {t("NNHT")}
        </Text>
        <TouchableOpacity
          style={{ width: 150 }}
          onPress={() => setShowLanguageList(!showLanguageList)}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: "#4a9fd5",

              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              height: 35,
              borderRadius: 30,
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                borderRadius: 64,
                marginLeft: 10,
              }}
              source={
                languageOptions.find((lang) => lang.name === selectedLanguage)
                  ?.flag
              }
            />
            <Text style={{ fontWeight: "bold", fontSize: 13 }}>
              {selectedLanguage}
            </Text>
            <Entypo name="chevron-small-down" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {showLanguageList && (
          <FlatList
            data={languageOptions}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageItem}
                onPress={() => handleSelectLanguage(item)}
              >
                <View style={styles.languageRow}>
                  <Image source={item.flag} style={styles.flag} />
                  <Text style={styles.languageItemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.languageList}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#E0E0E0",
          height: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            width: 200,
          }}
        >
          {t("TTMN")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#3E87F6" }}
            thumbColor={isEnabled ? "#3E87F6" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          <Text style={{ fontWeight: "bold" }}>
            {isEnabled ? "Bật" : "Tắt"}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  languageList: {
    backgroundColor: "white",
    position: "absolute",
    top: 6,
    left: 221.5,
    right: 10,
    zIndex: 10,
    maxHeight: 200,
    width: 150,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#4a9fd5",
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 25,
    height: 25,
    borderRadius: 64,
    marginRight: 13,
  },
  languageItemText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
export default AnotherSetting;
