import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import UsersList from "./src/screens/UserList";
import { SafeAreaView } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigations/AppNavigator";
import "./src/locales/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLanguage } from "./src/locales";

export default function App() {
  const [language, setLanguage] = useState("");

  // Lấy ngôn ngữ từ AsyncStorage khi ứng dụng bắt đầu
  const getLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("@language");
      if (savedLanguage !== null) {
        setLanguage(savedLanguage); // Cập nhật ngôn ngữ từ AsyncStorage
        changeLanguage(savedLanguage === "Tiếng Việt" ? "vi" : "en");
      } else {
        // Nếu không có ngôn ngữ lưu trữ, bạn có thể đặt mặc định là Tiếng Việt hoặc ngôn ngữ khác
        setLanguage("Tiếng Việt");
      }
    } catch (e) {
      console.error("Error loading language", e);
    }
  };

  useEffect(() => {
    getLanguage(); // Kiểm tra và lấy ngôn ngữ khi ứng dụng khởi động
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
