
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './client/components/Home';
import Recommendations from './client/components/Recommendations';



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Recommendations"
        onPress={() => navigation.navigate('Recommendations')}
      />
    </View>
  );
}

function RecommendationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Recommendations Screen</Text>
      <Recommendations />
  </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './client/components/Home'
// import ListCocktails from './client/components/ListCocktails'

// import {
//   StyleSheet,
//   Button,
//   View,
//   Text,
// } from 'react-native';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Home> </Home>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// export default function App() {

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>App Screen</Text>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="Details" component={ListCocktails} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// };

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5'
//   },

//   activityIndicatorContainer: {
//     backgroundColor: "#fff",
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },

//   floatingButton: {
//     backgroundColor: '#6B9EFA',
//     borderColor: '#6B9EFA',
//     height: 55,
//     width: 55,
//     borderRadius: 55 / 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     bottom: 60,
//     right: 15,
//     shadowColor: "#000000",
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 1,
//       width: 0
//     }
//   }
// });