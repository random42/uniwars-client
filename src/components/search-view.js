import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { List, ListItem } from 'react-native-elements';


export class SearchView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item,index) => index.toString()}
          >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 400,
    width: 300,
    backgroundColor: '#FFF',
  },
});
