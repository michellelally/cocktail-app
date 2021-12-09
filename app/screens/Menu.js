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
        fontWeight: '500',
        color: '#000000',
        fontFamily: 'sans-serif-light'
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