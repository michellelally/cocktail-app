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
            <Text> {data.item.name}</Text>
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
        backgroundColor: '#FFF',
        borderRadius: 6,
    },

    image: {
        height: '100%',
        borderRadius: 4,
    },
});

export default DisplayCocktails;