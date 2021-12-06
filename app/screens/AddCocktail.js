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

    coupe = 'https://raw.githubusercontent.com/michellelally/cocktail-app/main/assets/images/coupe.png?token=AIQ5F5PI2QR2VL73GW7MXRTBV2CGU';
    collins = 'https://raw.githubusercontent.com/michellelally/cocktail-app/main/assets/images/collins.png?token=AIQ5F5LTHCDIRMI5OYHTGP3BV2CDW';
    jug = 'https://raw.githubusercontent.com/michellelally/cocktail-app/main/assets/images/jug.png?token=AIQ5F5NRMQCNSNP6R65QX3TBV2CGY'
    tikki = 'https://raw.githubusercontent.com/michellelally/cocktail-app/main/assets/images/tikki.png?token=AIQ5F5KYIU47AKYRTEHIVQTBV2CHK'
    rocks = 'https://raw.githubusercontent.com/michellelally/cocktail-app/main/assets/images/rocks.png?token=AIQ5F5NRXSBLJ5ZRV2OTTF3BVZ74K'

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
                    <Picker.Item label="Coupe" value={this.coupe} />
                    <Picker.Item label="Tikki" value={this.tikki} />
                    <Picker.Item label="Collins" value={this.collins} />
                    <Picker.Item label="Rocks" value={this.rocks} />
                    <Picker.Item label="Margarita" value="Margarita" />
                    <Picker.Item label="Jug" value={this.jug} />
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
