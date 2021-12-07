import React from 'react';
import {
    Text, View, Button, StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

class DisplayCocktails extends React.Component {
    
    preferences = this.props.route.params.preferences;

    state = {
        cocktails: [],
        modalOpen: false,
        recommendations: []
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

    getRecommendations(key) {
        console.log("key: ", key)
        const url = "http://192.168.43.228:5000/recommend";

        const data = {
            key: key
        }

        axios.post(url, data)
            .then(res => {
                this.setState({ recommendations: res.data });
                console.log(this.state.recommendations)
            })
            .catch(err => console.log(err.data))
        this.setState({ modalOpen: true })
    }
    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.container} onPress={() => this.getRecommendations(data.item.key)}>
            <Text style={styles.text}> {data.item.name}</Text>
            <Text style={styles.text}> {data.item.ingredients}</Text>
            <Image style={styles.image} source={{ uri: data.item.glass }} />
        </TouchableOpacity>


    render() {
        return (
            <SafeAreaView>

                <Modal visible={this.state.modalOpen} animationType='slide'>
                    <View style={styles.modalContent}>
                        <Icon raised
                            name="rectangle-xmark"
                            size={30}
                            color="#900"
                            onPress={() => this.setState({ modalOpen: false })}
                        />

                        <FlatList
                            data={this.state.recommendations}
                            renderItem={item => this.renderItemComponent(item)}
                        />
                    </View>
                </Modal>

                <FlatList
                    data={this.state.cocktails}
                    renderItem={item => this.renderItemComponent(item)}
                />
            </SafeAreaView >)
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
    },
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    }
});

export default DisplayCocktails;