import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigations/AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
