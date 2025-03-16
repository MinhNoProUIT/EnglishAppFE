import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import UsersList from "./src/screens/UserList";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaView } from "react-native";
import "./global.css"

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
}
