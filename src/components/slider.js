import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";

export class Slider extends Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={this.props.renderItem}
          horizontal
          bounces={false}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
