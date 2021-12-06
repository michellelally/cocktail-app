import React from 'react';

import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import axios from 'axios';

export default class AddCocktail extends React.Component {

    state = {
        name: '',
        spirit: '',
        description: '',
        ingredients: '',
        glass: ''
    };

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleIngredients = (text) => {
        this.setState({ ingredients: text })
    }

    submit = (name, spirit, description, ingredients, glass) => {
        console.log(name + ' ' + spirit + ' ' + description + ' ' + ingredients + ' ' + glass)
        axios.post('http://192.168.43.228:5000/api/insert', {
            name: name,
            spirit: spirit,
            description: description,
            ingredients: ingredients,
            glass: glass
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    placeholder="Enter name"
                    onChangeText={this.handleName}
                />

                <Picker
                    selectedValue={this.state.spirit}
                    style={styles.inputBox}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ spirit: itemValue })
                    }>
                    <Picker.Item label="Select a spirit" />
                    <Picker.Item label="Vodka" value="Vodka" />
                    <Picker.Item label="Whiskey" value="Whiskey" />
                    <Picker.Item label="Rum" value="Rum" />
                    <Picker.Item label="Gin" value="Gin" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>

                <Picker
                    selectedValue={this.state.description}
                    style={styles.inputBox}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ description: itemValue })
                    }>
                    <Picker.Item label="Select a flavour description" />
                    <Picker.Item label="Sweet" value="Sweet" />
                    <Picker.Item label="Refreshing" value="Refreshing" />
                    <Picker.Item label="Sour" value="Sour" />
                    <Picker.Item label="Boozy" value="Boozy" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>

                <TextInput style={styles.input}
                    placeholder="Enter Ingredients"
                    style={styles.inputBox}
                    onChangeText={this.handleIngredients}
                />

                <Picker
                    selectedValue={this.state.glass}
                    style={styles.inputBox}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ glass: itemValue })
                    }>
                    <Picker.Item label="Select a glass" />
                    <Picker.Item label="Coupe" value="Coupe" />
                    <Picker.Item label="Tikki" value="Tikki" />
                    <Picker.Item label="Collins" value="Collins" />
                    <Picker.Item label="Rocks" value="Rocks" />
                    <Picker.Item label="Margarita" value="Margarita" />
                    <Picker.Item label="Jug" value="Jug" />
                </Picker>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.submit(this.state.name, this.state.spirit, this.state.description, this.state.ingredients, this.state.glass)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        height: 50,
        margin: 3,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    itemText: {
        fontSize: 25,
        paddingTop: 5,
        textAlign: "center"
    }
});
