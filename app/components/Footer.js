import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home'
import Dashboard from '../screens/dashboard'
import Menu from '../screens/Menu'
import ListCocktails from '../screens/ListCocktails';

const Tab = createBottomTabNavigator();

function Footer() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Menu" component={Menu} />
            <Tab.Screen name="Login" component={Dashboard} />
        </Tab.Navigator>
    );
}

export default Footer;