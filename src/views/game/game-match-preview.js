import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import Avatar from 'react-native-user-avatar';
import _ from 'lodash/core'

const WINDOW = Dimensions.get('window')
const HEIGHT = WINDOW.height,
WIDTH = WINDOW.width

// tempo in cui rimane aperta questa scena
const viewTime = 2000
let goku = "https://images.everyeye.it/img-notizie/dragon-ball-super-toyotaro-disegna-goku-ultra-istinto-in-versione-manga-v3-329799-1280x720.jpg"
let robi = "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4"

@inject('store') @observer
export class GameMatchPreview extends Component {

  componentDidMount() {
  }

  renderVS() {
    return (
      <View style={styles.vsContainer}>
        <Text style={styles.vs}>VS</Text>
      </View>
    );
  }

  renderUser(user) {
    return (
      <View style={styles.user}>
        <Avatar
          size={70}
          name={user.username}
          src={user.picture}
          />
        <Text style={styles.userText}>{user.username}</Text>
        <Text style={styles.userText}>{user.perf.rating}</Text>
      </View>
    )
  }

  renderSolo() {
    let my_id = this.props.store.profile._id
    let players = this.props.game.players
    let me, enemy
    if (players[0]._id === my_id) {
      me = players[0]
      enemy = players[1]
    } else {
      me = players[1]
      enemy = players[0]
    }
    me.picture = robi
    enemy.picture = goku
    // me = {
    //   username: 'random',
    //   picture: robi,
    //   perf: {
    //     rating: 1524
    //   }
    // }
    //
    // enemy = {
    //   username: 'shorty',
    //   picture: goku,
    //   perf: {
    //     rating: 1623
    //   }
    // }
    return (
      <View style={styles.container}>
        {this.renderUser(me)}
        {this.renderVS()}
        {this.renderUser(enemy)}
      </View>
    )
  }

  render() {
    return this.renderSolo()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vsContainer: {
    height: WIDTH * 0.25,
    width: WIDTH * 0.25,
    borderRadius: WIDTH * 0.125,
    alignSelf: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vs: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white'
  },
  user: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 30
  }
});
