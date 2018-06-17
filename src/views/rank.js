import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { RankList, Slider } from '../components';
import Carousel from "react-native-carousel-control";

@inject('store') @observer
export class Rank extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel pageStyle={ { margin: 20, backgroundColor: "white", borderRadius: 5}}>
        <RankList containerStyle={styles.gridContainer} data={[]}/>
        <Text>Hello</Text>
        <Text>World!</Text>
        <Text>From carousel</Text>
      </Carousel>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
});
