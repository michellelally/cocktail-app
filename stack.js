import React from 'react';

import Home from './screens/Home';
import Preferences from './screens/PreferencesTest';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='Preferences' component={Preferences} />
    </Stack.Navigator>
  );
}

export default Stacks;