import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import UsersList from "./src/screens/UserList";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <UsersList />
      </SafeAreaView>
    </Provider>
  );
}
