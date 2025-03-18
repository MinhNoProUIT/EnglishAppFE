import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import UsersList from "./src/screens/UserList";
import { SafeAreaView } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigations/AppNavigator";
import "./src/locales/index";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
