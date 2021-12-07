import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

export default class SwipeoutDemo extends React.Component {

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

  navigateToAddCocktail(key) {
    this.props.navigation.navigate("AddCocktail")
  }

  edit(cocktail) {
    const key = cocktail.item._id
    this.props.navigation.navigate("UpdateCocktail", {
      title: "UpdateCocktail",
      key: key
    })
    this.handleRefresh();
  }

  delete(cocktail) {
    const data = {
      id: cocktail.item._id
    }

    const url = `http://192.168.43.228:5000/api/delete/${data.id}`

    axios.delete(url, data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err.data));


    this.props.navigation.navigate('ListCocktails');
    this.handleRefresh();
  }

  swipeoutBtns(item) {
    return [
      {
        text: 'Edit',
        onPress: () => this.edit(item),
        type: 'secondary',
      },
      {
        text: 'Delete',
        onPress: () => this.delete(item),
        type: 'delete',
      }
    ]
  }

  renderItemComponent = (data) =>
    <Swipeout right={this.swipeoutBtns(data)} autoClose style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={() => alert(data.item.ingredients)}>
        <Text style={styles.itemText}> {data.item.name} </Text>
      </TouchableOpacity>
    </Swipeout>

  render() {
    return (
      <View>
        {/* <Button
          title="Add Cocktail"
          onPress={() => this.navigateToAddCocktail()}
        /> */}
        <FlatList
          data={this.state.cocktails}
          renderItem={item => this.renderItemComponent(item)}
          style={{ paddingTop: 10, paddingLeft: 50, paddingRight: 50 }}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 6,
    margin: 2,
  },
  itemText: {
    fontSize: 25,
    paddingTop: 5,
    textAlign: "center"
  }
});
