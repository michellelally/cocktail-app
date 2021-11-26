import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class DisplayCocktails extends React.Component {
    preferences = this.props.route.params.preferences;
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>DisplayCocktails Screen</Text>
                <Text>{this.preferences[0]}</Text>
                <Text>{this.preferences[1]}</Text>
            </View >
        );
    }
}

export default DisplayCocktails;