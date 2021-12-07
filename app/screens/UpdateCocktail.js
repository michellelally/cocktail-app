import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

export default class UpdateCocktail extends React.Component {

    key = this.props.route.params.key;

    state = {
        name: '',
        spirit: '',
        description: '',
        ingredients: '',
        glass: '',
        _id: ''
    };

    componentDidMount() {
        this.fectchCocktail();
    }

    fectchCocktail() {
        const data = {
            key: this.key
        }

        const url = "http://192.168.43.228:5000/api/cocktail";

        axios.post(url, data)
            .then(res => {
                this.setState({ name: res.data.name })
                this.setState({ spirit: res.data.spirit });
                this.setState({ description: res.data.description });
                this.setState({ ingredients: res.data.ingredients });
                this.setState({ glass: res.data.glass });
                this.setState({ _id: res.data._id });
                this.handleName(res.data.name);
                this.handleIngredients(res.data.ingredients);
            })
            .catch(err => console.log(err.data));
    }

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleIngredients = (text) => {
        this.setState({ ingredients: text })
    }

    isValid(name, spirit, description, ingredients, glass, id) {
        if (name != '' && spirit != '' && description != '' && ingredients != '' && glass != '') {
            this.submit(name, spirit, description, ingredients, glass, id)
        } else {
            alert("Fields cannot be blank")
        }
    }

    submit = (name, spirit, description, ingredients, glass, id) => {
        console.log(name + ' ' + spirit + ' ' + description + ' ' + ingredients + ' ' + glass)
        axios.put('http://192.168.43.228:5000/api/update', {
            name: name,
            spirit: spirit,
            description: description,
            ingredients: ingredients,
            glass: glass,
            _id: id
        })
        this.props.navigation.navigate("ListCocktails")
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => this.handleName(text)}
                    placeholder={"Name"}
                    autoFocus={true}
                    style={styles.textInput}
                    value={this.state.name} />

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

                <TextInput
                    onChangeText={(text) => this.handleIngredients(text)}
                    placeholder={"Name"}
                    autoFocus={true}
                    style={styles.textInput}
                    value={this.state.ingredients} />


                <Picker
                    selectedValue={this.state.glass}
                    style={styles.inputBox}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ glass: itemValue })
                    }>
                    <Picker.Item label="Select a glass" />
                    <Picker.Item label="Coupe" value={coupe} />
                    <Picker.Item label="Hurricane" value={hurricane} />
                    <Picker.Item label="Collins" value={collins} />
                    <Picker.Item label="Rocks" value={rocks} />
                    <Picker.Item label="Margarita" value={margarita} />
                    <Picker.Item label="Jug" value={jug} />
                </Picker>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.isValid(this.state.name, this.state.spirit, this.state.description, this.state.ingredients, this.state.glass, this.state._id)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    inputBox: {
        height: 50,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 20
    },
    itemText: {
        fontSize: 25,
        paddingTop: 5,
        textAlign: "center"
    }, 
    textInput: {
        fontSize: 15,
        height: 50,
        margin: 10,
        paddingLeft: 20,
        backgroundColor: '#FFF',
        borderRadius: 6,
    }
});