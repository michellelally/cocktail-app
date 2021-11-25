import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Dashboard() {
    const navigation = useNavigation();

    function onBackPressed() {
        navigation.goBack()
    }
    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Dashboard Screen</Text>
            <Button title="Click to go Back"
                onPress={() => onBackPressed()}
            />
        </View>

    );
}