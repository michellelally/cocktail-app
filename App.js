import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Preferences from './screens/Preferences'
import Dashboard from './screens/dashboard'
import Grid from './screens/GridTest'
import DisplayCocktails from './screens/DisplayCocktails';

const AppStack = createStackNavigator();
export default function Navigator() {

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }} >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="Grid" component={Grid} />
        <AppStack.Screen name="Preferences" component={Preferences} />
        <AppStack.Screen name="DisplayCocktails" component={DisplayCocktails} />

      </AppStack.Navigator>
    </NavigationContainer>
  );
}

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import Home from "./screens/Home";
// import Preferences from "./screens/PreferencesTest";

// const MainStack = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       headerTitle: "Home"
//     }
//   },
//   Preferences: {
//     screen: Preferences,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: navigation.getParam("title"),
//       headerTintColor: "#fff",
//       headerStyle: {
//         backgroundColor: navigation.getParam("color"),
//         borderBottomColor: navigation.getParam("color")
//       }
//     })
//   }
// });

// export default createAppContainer(MainStack);

// // // import * as React from 'react';
// // // import { View, Text, Button, StyleSheet } from 'react-native';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // // import Home from './screens/Home';
// // // import Recommendations from './screens/Recommendations';
// // // import Preferences from './screens/Preferences'


// // // function HomeScreen({ navigation }) {
// // //   return (
// // //     <View>
// // //       <Home />
// // //     </View>
// // //   );

// // // }


// // // function PreferencesScreen({ navigation }) {
// // //   return (
// // //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //       <Preferences />
// // //     </View>
// // //   );

// // // }

// // // function RecommendationsScreen({ navigation }) {
// // //   return (
// // //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //       <Text>Recommendations Screen</Text>
// // //       <Recommendations />
// // //     </View>
// // //   );
// // // }


// // // const Stack = createNativeStackNavigator();

// // // function App() {
// // //   return (
// // //     <NavigationContainer>
// // //       <Stack.Navigator>
// // //       {/* <Stack.Screen name="Preferences" component={PreferencesScreen} /> */}
// // //         <Stack.Screen name="Home" component={HomeScreen} />
// // //         <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
// // //       </Stack.Navigator>

// // //     </NavigationContainer>
// // //   );
// // // }

// // // export default App;
