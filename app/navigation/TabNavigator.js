import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, LoginStackNavigator } from "./StackNavigator";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainStackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen
                name="Login"
                component={LoginStackNavigator}
                options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={26} />
                    )
                }}
            />

        </Tab.Navigator>

    );

};

export default BottomTabNavigator;