// import React from 'react';
// import { Text } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Menu from './screens/Menu'
// import Home from './screens/Home'
// import Dashboard from './screens/dashboard'


// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// function Scr() {
//   return <Text>hello</Text>;
// }
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       tabBarOptions={{
//         activeTintColor: '#414757',
//       }}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Menu" component={Menu} />
//       <Tab.Screen name="Login" component={Dashboard} />

//     </Tab.Navigator>
//   );
// }

// export default function Routing() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="login"
//           component={Scr}
//           options={{ header: () => null }}
//         />
//         <Stack.Screen
//           name="dashboard"
//           component={MyTabs}
//           options={{ header: () => null }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Preferences from './screens/Preferences'
import Dashboard from './screens/dashboard'
import DisplayCocktails from './screens/DisplayCocktails';
import ListCocktails from './screens/ListCocktails';
import AddCocktail from './screens/AddCocktail';
import UpdateCocktail from './screens/UpdateCocktail'
import Menu from './screens/Menu'
import Footer from './components/Footer'

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
        <AppStack.Screen name="Tabs" component={Tabs} />
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