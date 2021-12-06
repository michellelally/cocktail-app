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
import { sub } from 'react-native-reanimated';

export default class Login extends React.Component {

    state = {
        email: '',
        password: '',
        blank: true
    };

    handleEmail = (text) => {
        this.setState({ email: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    isValid(email, password) {
        if (email != '' && password != '') {
            this.submit()
        } else {
            alert("Fields cannot be blank")
        }
    }

    // email: test@test.com
    // password: test

    submit = () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(email + ' ' + password)
        axios.post('http://192.168.43.228:5000/auth/sign_in', data)
            .then(res => {
                if (res.data.token) {
                    return this.props.navigation.navigate("ListCocktails", {
                        token: res.data.token
                    });
                }
            })
            .catch(() => {
                alert("Incorrect email or password. Please try again ")
            })
        // this.props.navigation.goBack()

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => this.handleEmail(text)}
                    placeholder={"Email"}
                    autoFocus={true}
                    style={[styles.inputBox]}
                    value={this.state.email} />

                <TextInput
                    onChangeText={(text) => this.handlePassword(text)}
                    placeholder={"Password"}
                    autoFocus={true}
                    style={[styles.inputBox]}
                    value={this.state.password} />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.isValid(this.state.email, this.state.password)
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
