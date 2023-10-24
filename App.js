import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/MainComponent";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./redux/store"; // Import your Redux store

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
