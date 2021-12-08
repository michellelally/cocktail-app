import React from "react";
import ImageBackground from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./app/navigation/TabNavigator";
import { globalStyles } from "./app/styles/global"
import image from './app/assets/harrys.png'

const App = () => {
  return (
    <NavigationContainer>
        <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;