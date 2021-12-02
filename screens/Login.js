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


import axios from 'axios';

export default class Login extends React.Component {


    state = {
        username: '',
        password: ''
    };

    // componentDidMount() {
    //     this.fectchCocktail();
    // }

    // fectchCocktail() {
    //     const data = {
    //         key: this.key
    //     }

    //     const url = "http://192.168.43.228:5000/api/cocktail";

    //     axios.post(url, data)
    //         .then(res => {
    //             this.setState({ name: res.data.name })
    //             this.setState({ spirit: res.data.spirit });
    //             this.setState({ description: res.data.description });
    //             this.setState({ ingredients: res.data.ingredients });
    //             this.setState({ glass: res.data.glass });
    //             this.setState({ _id: res.data._id });
    //             console.log(this.state._id);
    //             this.handleName(res.data.name);
    //             this.handleIngredients(res.data.ingredients);
    //         })
    //         .catch(err => console.log(err.data));
    // }

    handlePassword = (text) => {
        this.setState({ username: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    submit = (username, password) => {
        console.log(username + ' ' + password)
        axios.put('http://192.168.43.228:5000/login', {
            username: username,
            password: password,
        })
        // this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => this.handleName(text)}
                    placeholder={"Name"}
                    autoFocus={true}
                    style={[styles.inputBox]}
                    value={this.state.name} />

                <TextInput
                    onChangeText={(text) => this.handleIngredients(text)}
                    placeholder={"Name"}
                    autoFocus={true}
                    style={[styles.inputBox]}
                    value={this.state.ingredients} />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.submit(this.state.name, this.state.spirit, this.state.description, this.state.ingredients, this.state.glass, this.state._id)
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
