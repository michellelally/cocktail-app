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


class Menu extends React.Component {

    state = {
        cocktails: []
    };

    componentDidMount() {
        this.fectchCocktails();
    }

    fectchCocktails() {
        const url = "http://192.168.43.228:5000/api/cocktails";

        axios.get(url)
            .then(res => {
                this.setState({ cocktails: res.data });
                // console.log(this.state.cocktails)
            })
            .catch(err => console.log(err.data))
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.container}>
            <View style={{ textAlign: "center"}}>
                <Text style={{ textAlign: "center"}}> {data.item.name}</Text>
                <Text style={{ textAlign: "center"}}> {data.item.ingredients}</Text>
            </View>

        </TouchableOpacity>


    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.cocktails}
                    renderItem={item => this.renderItemComponent(item)}
                />
            </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        borderRadius: 6,
    },

    image: {
        height: '100%',
        borderRadius: 4
    },
    centerText: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "centers"

    }
});

export default Menu;