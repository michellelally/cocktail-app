/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";

import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true
    }
  }

  componentDidMount() {
    this.fetchRecs();
  }

  fetchRecs() {
    this.setState({ refreshing: true });
    fetch('http://192.168.43.228:5000/recommend')
      // fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson.recommendations });
        console.log(this.state.data)
        this.setState({ refreshing: false });
      }).catch(e => console.log(e));
  }

  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container}>
        <Text> {data.item.title}</Text>
      <Image style={styles.image} source={{ uri: data.item.image_url }} />
    </TouchableOpacity>

  ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }}
  />

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchRecs() }); // call fetchRecs after setting the state
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item)}
          keyExtractor={item => item.book_id.toString()}
          ItemSeparatorComponent={this.ItemSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
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
