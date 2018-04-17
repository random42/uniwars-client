import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class RankTabBar extends Component {

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'green'
  }
});
