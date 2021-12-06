import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

export default class SwipeoutDemo extends React.Component {

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

  navigateToUpdate(key) {
    this.props.navigation.navigate("UpdateCocktail", {
      title: "UpdateCocktail",
      key: key
    })
  }

  delete(cocktail) {
    console.log("delete pressed")
    console.log(cocktail.item._id)
    const data = {
      id: cocktail.item._id
    }

    console.log(data)
    const url = `http://192.168.43.228:5000/api/delete/${data.id}`

    console.log(url);
    axios.delete(url, data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.data));

    this.fectchCocktails();
  }

  swipeoutBtns(item) {
    return [
      {
        text: 'Delete',
        onPress: () => this.delete(item),
        type: 'delete',
      }
    ]
  }

  renderItemComponent = (data) =>
    <Swipeout right={this.swipeoutBtns(data)} autoClose style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => this.navigateToUpdate(data.item._id)}>
        <Text style={styles.itemText}> {data.item.name} </Text>
      </TouchableOpacity>
    </Swipeout>

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.cocktails}
          renderItem={item => this.renderItemComponent(item)}
          style={{ paddingTop: 10, paddingLeft: 50, paddingRight: 50 }}
        />
      </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 6,
    margin: 2
  },
  itemText: {
    fontSize: 25,
    paddingTop: 5,
    textAlign: "center"
  }
});
