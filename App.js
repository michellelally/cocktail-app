import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./app/navigation/TabNavigator";

const App = () => {
  return (
    <NavigationContainer>
          {/* <Text testID="title">Hello there</Text> */}

        <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;