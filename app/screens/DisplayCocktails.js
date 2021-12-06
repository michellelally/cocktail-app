import React from 'react';
import {
    Text, View, Button, StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import pic from '../assets/images/collins.png';

class DisplayCocktails extends React.Component {
    preferences = this.props.route.params.preferences;

    state = {
        cocktails: []
    };

    componentDidMount() {
        this.fectchCocktails();
    }

    fectchCocktails() {
        const url = "http://192.168.43.228:5000/api/suggestions";

        const data = {
            spirit: this.preferences[0],
            description: this.preferences[1]
        }

        axios.post(url, data)
            .then(res => {
                this.setState({ cocktails: res.data });
            })
            .catch(err => console.log(err.data))
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}> {data.item.name}</Text>
            <Text style={styles.text}> {data.item.ingredients}</Text>
            <Image style={styles.image} source={{ uri: data.item.glass }} />
        </TouchableOpacity>


    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.cocktails}
                    renderItem={item => this.renderItemComponent(item)}
                // keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: 10,
        backgroundColor: 'orange',
        borderRadius: 6,

    },
    image: {
        height: '60%',
        margin: 130,
        borderRadius: 4,
        marginTop: 0
    },
    text: {
        textAlign: "center",
        fontSize: 20
    }
});

export default DisplayCocktails;