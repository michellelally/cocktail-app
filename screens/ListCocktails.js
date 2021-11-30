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


  edit() {
    // axios.put('http://localhost:5050/api/update-todo/' + this.taskObj._id, this.taskObj)
    // .then((res) => {
    //   console.log('Todo updated' + res)
    //   this.refreshPage()
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  delete() {
    console.log("delete pressed")
  }

  swipeoutBtns = [
    {
      text: 'Edit',
      onPress: () => this.edit(),
      type: 'primary'
    },
    {
      text: 'Delete',
      onPress: () => this.delete(),
      type: 'delete'
    }
  ]
  renderItemComponent = (data) =>
    <Swipeout right={this.swipeoutBtns} autoClose style={styles.container}>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.itemText}> {data.item.name}</Text>
      </TouchableOpacity>
    </Swipeout>

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.cocktails}
          renderItem={item => this.renderItemComponent(item)}
          style={{ padding: 75 }}
        />
      </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 3,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  itemText: {
    fontSize: 25,
    paddingTop: 5,
    textAlign: "center"
  }
});
