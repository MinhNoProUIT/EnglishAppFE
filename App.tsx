import React from "react";
import { Provider } from "react-redux";
import { store } from "../frontend/src/redux/store";
import UsersList from "../frontend/src/screens/UserList";
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
