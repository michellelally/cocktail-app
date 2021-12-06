
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/screens/Home'
import Preferences from './app/screens/Preferences'
import Dashboard from './app/screens/dashboard'
import DisplayCocktails from './app/screens/DisplayCocktails';
import ListCocktails from './app/screens/ListCocktails';
import AddCocktail from './app/screens/AddCocktail';
import UpdateCocktail from './app/screens/UpdateCocktail'
import Menu from './app/screens/Menu'
import Login from './app/screens/Login'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const AppStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Menu" component={Menu} />
            <Tab.Screen name="Login" component={Dashboard} />
        </Tab.Navigator>
    );
}

export default function Navigator() {

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="ListCocktails" component={ListCocktails} />
        <AppStack.Screen name="Preferences" component={Preferences} />
        <AppStack.Screen name="DisplayCocktails" component={DisplayCocktails} />
        <AppStack.Screen name="AddCocktail" component={AddCocktail} />
        <AppStack.Screen name="UpdateCocktail" component={UpdateCocktail} />
        <AppStack.Screen name="Menu" component={Menu} />
        <AppStack.Screen name="Login" component={Login} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}


// import { createStackNavigator } from '@react-navigation/stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { createAppContainer } from 'react-navigation';
// import Screen1 from './screens/Home';
// import Screen2 from './screens/Menu';
// import Screen3 from './screens/dashboard';

// class HomeScreen extends React.Component {
//   render() {
//     return (
//        <View><Text>Welcome</Text></View>
//     );
//  } 
// }

// const AppNavigator = createStackNavigator({
//   Home: { screen: TabNavigator },
//   Screen1: { screen: Screen1 },
//   Screen2: { screen: Screen2 },
//   Screen3: { screen: Screen3 },
// });

// const TabNavigator = createBottomTabNavigator({
//   Home: { screen: HomeScreen },
//   Screen3: { screen: Screen3 },
// });

// export default AppNavigator;