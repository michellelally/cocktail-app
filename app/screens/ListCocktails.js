import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import axios from 'axios';

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
    this.props.navigation.navigate("Update Cocktail", {
      title: "Update Cocktail",
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
    <Swipeout right={this.swipeoutBtns(data)} autoClose style={styles.item}>
      <TouchableOpacity style={styles.item} onPress={() => alert(data.item.ingredients)}>
        <Text style={styles.itemText}> {data.item.name} </Text>
      </TouchableOpacity>
    </Swipeout>

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Button
          title="Add New Cocktail"
          onPress={() => this.navigateToAddCocktail()}
        />
          <FlatList
            data={this.state.cocktails}
            renderItem={item => this.renderItemComponent(item)}
            contentContainerStyle={{ paddingBottom: 80, paddingLeft: 20, paddingRight: 20, paddingTop: 20}}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {

  },
  item: {
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