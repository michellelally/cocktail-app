import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home'
import Preferences from '../screens/Preferences'
import DisplayCocktails from '../screens/DisplayCocktails';
import ListCocktails from '../screens/ListCocktails';
import AddCocktail from '../screens/AddCocktail';
import UpdateCocktail from '../screens/UpdateCocktail'
import Menu from '../screens/Menu'
import Login from '../screens/Login'

const Stack = createStackNavigator();

const screenOptionStyle = {

  headerStyle: {
    backgroundColor: "rgba(225, 84, 0, 0.8)"
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerTitleAlign: 'center'
};

const MainStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Stack.Screen name="List Cocktails"  options={{ headerShown: false }} component={ListCocktails} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="DisplayCocktails" options={{ headerShown: false }} component={DisplayCocktails} />
      <Stack.Screen name="Add Cocktail" component={AddCocktail} />
      <Stack.Screen name="Update Cocktail" component={UpdateCocktail} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Staff Login" component={Login} />

    </Stack.Navigator>

  );

};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Staff Login" component={Login} />
    </Stack.Navigator>
  );
};

const MenuStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
};




export { MainStackNavigator, LoginStackNavigator, MenuStackNavigator };