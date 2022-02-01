import React from 'react';

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Button } from "../components/Button";
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
        this.props.navigation.navigate("List Cocktails");
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Enter name"
                    onChangeText={this.handleName}
                />

                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.spirit}
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
                </View>

                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.description}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ description: itemValue })
                        }>
                        <Picker.Item label="Select a flavour description" />
                        <Picker.Item label="Sweet" value="Sweet" />
                        <Picker.Item label="Refreshing" value="Refreshing" />
                        <Picker.Item label="Sour" value="Sour" />
                        <Picker.Item label="Boozy" value="Boozy" />
                    </Picker>
                </View>

                <TextInput 
                    style={styles.textInput}
                    placeholder="Enter Ingredients"
                    onChangeText={this.handleIngredients}
                />

                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.glass}
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
                </View>

                <View style={{ marginLeft: 50, marginRight: 50 }}>
                    <Button
                        text="Submit"
                        onPress={
                            () => this.isValid(this.state.name, this.state.spirit, this.state.description, this.state.ingredients, this.state.glass, this.state._id)
                        }
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        margin: 5,
        backgroundColor: '#FFF',
        borderRadius: 6,
        fontSize: 15,
        paddingLeft: 15
    },
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
    picker: {
        height: 50,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
});
