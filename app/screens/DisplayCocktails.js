import React from 'react';
import {
    Text, View, StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    ImageBackground
} from 'react-native';
import { Button, ButtonContainer } from "../components/Button";

import Icon from 'react-native-vector-icons/FontAwesome';
import questions from "../data/questions";
import axios from 'axios';
import image from '../assets/harrys.png'


class DisplayCocktails extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToPreferences = () => {
            this.props.navigation.navigate("Preferences", {
                title: "Preferences",
                questions: questions,
            })
        }
    }

    preferences = this.props.route.params.preferences;

    state = {
        cocktails: [],
        modalOpen: false,
        recommendations: [],
        data: []
    };

    componentDidMount() {
        this.fectchCocktails();
    }

    fectchCocktails() {
        this.setState({ data: '' })

        const url = "http://192.168.43.228:5000/api/suggestions";


        if (this.preferences[1] == 'All') {
            this.state.data = {
                spirit: this.preferences[0]
            }
        } else {
            this.state.data = {
                spirit: this.preferences[0],
                description: this.preferences[1]
            }
        }

        axios.post(url, this.state.data)
            .then(res => {
                console.log(res.data)
                this.setState({ cocktails: res.data });

            })
            .catch(err => console.log(err.data))

        // if (this.state.cocktails.length == 0) {

        //     this.setState({ cocktails: notFound })
        //     console.log(this.state.cocktails)
        // }
    }

    getRecommendations(key) {
        console.log("key: ", key)
        const url = "http://192.168.43.228:5000/recommend";

        const data = {
            key: key
        }

        axios.post(url, data)
            .then(res => {
                this.setState({ recommendations: res.data.recommendations });
                // console.log(this.state.recommendations)
            })
            .catch(err => console.log(err.data))

        this.setState({ modalOpen: true })
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.
            item} onPress={() => this.getRecommendations(data.item.key)}>
            <View style={styles.overlay}>
                <Text style={styles.text}> {data.item.name}</Text>
                <Text style={styles.text}> {data.item.ingredients}</Text>
            </View>
            <Image style={styles.image} source={{ uri: data.item.glass }} />
        </TouchableOpacity>

    renderRecsComponent = (data) =>
        <TouchableOpacity style={styles.
            item}>
            <Text style={styles.text}> {data.item.name}</Text>
            <Image style={styles.recImage} source={{ uri: data.item.image_url }} />
        </TouchableOpacity>

    ItemSeparator = () => <View style={{
        height: 2,
        backgroundColor: "rgba(225, 84, 0, .5)",
        marginLeft: 10,
        marginRight: 10,
    }}
    />

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    source={image}
                    resizeMode="contain"
                    style={styles.backgroundImage}
                    imageStyle={{ opacity: 0.05 }}
                >
                    <Modal visible={this.state.modalOpen} animationType='slide'>
                        <ImageBackground
                            source={image}
                            resizeMode="contain"
                            style={styles.backgroundImage}
                            imageStyle={{ opacity: 0.05 }}
                        >
                            <View
                                style={styles.modalView}
                            >
                                <Icon name="close"
                                    raised
                                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                                    onPress={() => this.setState({ modalOpen: false })}
                                />
                                <Text style={styles.recsTitle}>Others also liked</Text>
                                <FlatList
                                    data={this.state.recommendations}
                                    ItemSeparatorComponent={this.ItemSeparator}
                                    renderItem={item => this.renderRecsComponent(item)}
                                    contentContainerStyle={{ paddingBottom: 20, paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}
                                />

                            </View>
                        </ImageBackground>
                    </Modal>
                    <View>
                        <ButtonContainer>
                            <Button text="GO AGAIN"
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </ButtonContainer>
                    </View>
                    <FlatList
                        data={this.state.cocktails}
                        renderItem={item => this.renderItemComponent(item)}
                        ItemSeparatorComponent={this.ItemSeparator}
                        contentContainerStyle={{ paddingBottom: 0, paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}
                    />
                </ImageBackground>
            </SafeAreaView >)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(169, 169, 169)',
        flex: 1,
    },
    item: {
        height: 300,
        margin: 10,
        paddingBottom: 50,
        borderRadius: 6
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        height: '90%',
        margin: 100,
        borderRadius: 4,
        marginTop: 0
    },
    modalView: {
        marginTop: 50,
        borderRadius: 20,
        backgroundColor: 'rgba(190, 169, 180)',
    },
    recsTitle: {
        color: "#000000",
        marginTop: 20,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "600",
        fontFamily: 'sans-serif-light',
        textTransform: 'uppercase'
    },
    text: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: '500',
        color: '#000000',
        fontFamily: 'sans-serif-light'
    },
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    recImage: {
        height: '100%',
        margin: 100,
        borderRadius: 4,
        marginTop: 0
    },
    button: {
        fontSize: 50,
        color: '#f2f2f2',
        height: "10%"
    },
    // overlay: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // }
});

export default DisplayCocktails;