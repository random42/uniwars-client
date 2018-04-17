import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {Actions} from "react-native-router-flux";
import { RankList } from '../components';
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';

@inject('store') @observer
export class Home extends Component {
  render() {
    let players = this.props.store.rank.top_5;
    return (
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <Button onPress={this.play}
          containerStyle={styles.playButtonContainer}
          style={styles.playButtonText}>
          Play!
        </Button>
        <RankList head={players.head} data={players.data} title="Top 5" />
      </ScrollView>
    );
  }

  play() {
    Actions.game();
  }

}

const styles = StyleSheet.create({
    container: { // View principale
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#F5FCFF",
    },
    playButtonContainer: {
      margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height:100,
      overflow: 'hidden',
      borderRadius:4,
      backgroundColor: 'orange'
    },
    playButtonText: {
      fontSize: 30,
      color: 'yellow'
    },
    rankView: {
      alignSelf: 'stretch',
    }
});
