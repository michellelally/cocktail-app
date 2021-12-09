import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    View,
    TextInput
} from 'react-native';
import { Button } from "../components/Button";
import axios from 'axios';
import image from '../assets/harrys.png'


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
        axios.post('http://192.168.43.228:5000/auth/sign_in', data)
            .then(res => {
                if (res.data.token) {
                    return this.props.navigation.navigate("List Cocktails", {
                        token: res.data.token
                    });
                }
            })
            .catch(() => {
                alert("Incorrect email or password. Please try again ")
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    source={image}
                    resizeMode="contain"
                    style={styles.backgroundImage}
                    imageStyle={{ opacity: 0.1 }}
                >
                    <TextInput
                        onChangeText={(text) => this.handleEmail(text)}
                        placeholder={"Email"}
                        autoFocus={true}
                        style={styles.inputBox}
                        value={this.state.email}
                    />

                    <TextInput
                        onChangeText={(text) => this.handlePassword(text)}
                        placeholder={"Password"}
                        autoFocus={true}
                        style={styles.inputBox}
                        secureTextEntry={true}
                        value={this.state.password}
                    />

                    <View style={{ marginLeft: 10,  marginRight: 10}}>
                        <Button
                            text="Submit"
                            onPress={
                                () => this.isValid(this.state.email, this.state.password)
                            }
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        height: 50,
        margin: 5,
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
    },
    container: {
        backgroundColor: 'rgba(169, 169, 169)',
        flex: 1,
        justifyContent: "flex-start",
        margin: 20
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "flex-start"
    }
});
