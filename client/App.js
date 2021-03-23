import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import Header from "./Shared/Header";
import ProductContainer from "./Screens/Products/ProductContainer";
import { NavigationContainer } from "@react-navigation/native";

//make Toast available on all the app
import Toast from 'react-native-toast-message'

//Redux
import { Provider } from "react-redux";
import store from "./Redux/Store";
//Navigators

import Main from "./Navigators/Main";

// Disable LogBox (Warnings)

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
        <Toast ref={(ref)=> Toast.setRef(ref)}/>
      </NavigationContainer>
    </Provider>
  );
}
