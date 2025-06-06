import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { ActivityIndicator, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator, {
  RootStackParamList,
} from "./src/navigations/AppNavigator";
import "./src/locales/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLanguage } from "./src/locales";
import { validateToken, refreshAccessToken } from "./src/utils/authUtils";

export default function App() {
  const [language, setLanguage] = useState("");
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  const getLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("@language");
      if (savedLanguage !== null) {
        setLanguage(savedLanguage);
        changeLanguage(savedLanguage === "Tiếng Việt" ? "vi" : "en");
      } else {
        setLanguage("Tiếng Việt");
      }
    } catch (e) {
      console.error("Lỗi tải ngôn ngữ:", e);
    }
  };

  const initApp = async () => {
    const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
    if (isFirstLaunch === null) {
      await AsyncStorage.setItem("isFirstLaunch", "false");
      return setInitialRoute("Onboarding");
    }

    const accessToken = await AsyncStorage.getItem("authToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (accessToken) {
      const isValid = await validateToken(accessToken);
      if (isValid) {
        return setInitialRoute("MainTabs");
      }
    }

    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        await AsyncStorage.setItem("authToken", newTokens.accessToken);
        await AsyncStorage.setItem("refreshToken", newTokens.refreshToken);
        return setInitialRoute("MainTabs");
      }
    }

    setInitialRoute("SignIn");
  };

  useEffect(() => {
    getLanguage();
    initApp();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator initialRoute={initialRoute} />
      </NavigationContainer>
    </Provider>
  );
}
