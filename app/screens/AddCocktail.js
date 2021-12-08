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

import { collins, coupe, hurricane, jug, margarita, rocks } from '../data/glasses'

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

    isValid(name, spirit, description, ingredients, glass) {
        console.log(this.state)
        if (name != '' && spirit != '' && description != '' && ingredients != '' && glass != '') {
            this.submit()
        } else {
            alert("Fields cannot be blank")
        }
    }

    submit = () => {
        console.log(this.state)
        axios.post('http://192.168.43.228:5000/api/insert', {
            name: this.state.name,
            spirit: this.state.spirit,
            description: this.state.description,
            ingredients: this.state.ingredients,
            glass: this.state.glass
        })
            .then(res => {
                console.log("res: ", res.data.inserted)
            })
        this.props.navigation.navigate("ListCocktails");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{this.state.error}</Text>
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
                    <Picker.Item label="Coupe" value={coupe} />
                    <Picker.Item label="Tikki" value={hurricane} />
                    <Picker.Item label="Collins" value={collins} />
                    <Picker.Item label="Rocks" value={rocks} />
                    <Picker.Item label="Margarita" value={margarita} />
                    <Picker.Item label="Jug" value={jug} />
                </Picker>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.isValid(this.state.name, this.state.spirit, this.state.description, this.state.ingredients, this.state.glass)
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
    },
    error: {
        color: 'red'
    }
});
