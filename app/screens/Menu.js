import React from 'react';
import {
    Text, View, Button, StyleSheet,
    SafeAreaView,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import image from '../assets/harrys.png'

class Menu extends React.Component {

    state = {
        cocktails: [],
        refreshing: true
    };

    componentDidMount() {
        this.fectchCocktails();
    }

    fectchCocktails() {
        this.setState({ refreshing: true });
        const url = "http://192.168.43.228:5000/api/cocktails";

        axios.get(url)
            .then(res => {
                this.setState({ cocktails: res.data });
                this.setState({ refreshing: false });
            })
            .catch(err => console.log(err.data))
    }

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fectchCocktails() }); // call fetchCocktails after setting the state
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.container}>
            <View style={{ textAlign: "center" }}>
                <Text style={styles.text}> {data.item.name}</Text>
                <Text style={styles.text}> {data.item.ingredients}</Text>
            </View>

        </TouchableOpacity>


    render() {
        return (
            <ImageBackground
                source={image}
                resizeMode="contain"
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.1 }}
            >
                <FlatList
                    data={this.state.cocktails}
                    renderItem={item => this.renderItemComponent(item)}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        borderRadius: 6,
    },
    text: {
        textAlign: "center",
        fontSize: 17,
        color: '#000000',
        fontFamily: 'sans-serif-light'
    },
    image: {
        height: '100%',
        borderRadius: 4
    }
});

export default Menu;