import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home'
import Preferences from '../screens/Preferences'
import Recommendations from '../screens/Recommendations'
import DisplayCocktails from '../screens/DisplayCocktails';
import ListCocktails from '../screens/ListCocktails';
import AddCocktail from '../screens/AddCocktail';
import UpdateCocktail from '../screens/UpdateCocktail'
import Menu from '../screens/Menu'
import Login from '../screens/Login'

const Stack = createStackNavigator();

const screenOptionStyle = {

  headerStyle: {
    backgroundColor: "#9AC4F8",
    textAlign: "center"
  },
  headerTintColor: "white",
  headerBackTitle: "Back",

};


const MainStackNavigator = () => {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      
    // screenOptions={{ headerStyle: { backgroundColor: "#9AC4F8", }, headerTintColor: "white", headerBackTitle: "Back", }}
    >
      <Stack.Screen name="Home" component={Home}  />
      <Stack.Screen name="Recommendations" component={Recommendations} />
      <Stack.Screen name="ListCocktails" component={ListCocktails} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="DisplayCocktails" component={DisplayCocktails} />
      <Stack.Screen name="AddCocktail" component={AddCocktail} />
      <Stack.Screen name="UpdateCocktail" component={UpdateCocktail} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>

  );

};

const LoginStackNavigator = () => {

  return (

    <Stack.Navigator screenOptions={screenOptionStyle}>

      <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>

  );

};



export { MainStackNavigator, LoginStackNavigator };