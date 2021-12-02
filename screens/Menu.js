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
    preferences = this.props.route.params.preferences;

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
            <Text> {data.item.name}</Text>
        </TouchableOpacity>

    ItemSeparator = () => <View style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
    }}
    />

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.cocktails}
                    renderItem={item => this.renderItemComponent(item)}
                    // keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.ItemSeparator}
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

export default Menu;