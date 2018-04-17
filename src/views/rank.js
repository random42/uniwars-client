import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { RankList, Slider } from '../components';

@inject('store') @observer
export class Rank extends Component {

  render() {
    let rank = this.props.store.rank.getRankings(this.props.which);
    return (
      <View style={styles.container}>
        <RankList containerStyle={styles.gridContainer} head={rank.head} data={rank.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    //margin: 20,
    backgroundColor: 'red'
  },
});
