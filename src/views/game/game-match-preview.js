import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import PropTypes from 'prop-types'
import Avatar from 'react-native-user-avatar';
import _ from 'lodash/core'

const WINDOW = Dimensions.get('window')
const HEIGHT = WINDOW.height,
WIDTH = WINDOW.width

// tempo in cui rimane aperta questa scena
const viewTime = 2000
const goku = "https://images.everyeye.it/img-notizie/dragon-ball-super-toyotaro-disegna-goku-ultra-istinto-in-versione-manga-v3-329799-1280x720.jpg"
const robi = "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4"

@inject('store') @observer
export class GameMatchPreview extends Component {

  static propTypes = {
    // see database model
    game: PropTypes.object
  }

  static defaultProps = {
    game: {
      type: 'solo',
      players: [
        {
          username: 'random',
          picture: robi,
          perf: {
            rating: 9001
          }
        },{
          username: 'It\'s over 9000!',
          picture: goku,
          perf: {
            rating: 1000000
          }
        }
      ]
    }
  }

  componentDidMount() {
  }

  renderVS() {
    return (
      <View style={styles.vsContainer}>
        <Text style={styles.vs}>VS</Text>
      </View>
    );
  }

  renderUser(user, style) {
    return (
      <View style={[styles.user, style]}>
        <Avatar
          size={WIDTH * 0.2}
          name={user.username}
          src={user.picture}
          />
        <View style={styles.userTextView}>
          <Text style={styles.usernameText}>{user.username}</Text>
          <Text style={styles.ratingText}>{user.perf.rating}</Text>
        </View>
      </View>
    )
  }

  renderSolo() {
    const my_id = this.props.store.profile._id
    const { players } = this.props.game
    let me, enemy
    if (players[0]._id === my_id) {
      me = players[0]
      enemy = players[1]
    } else {
      me = players[1]
      enemy = players[0]
    }
    const myStyle = {
      alignSelf: 'flex-start',
      paddingHorizontal: WIDTH * 0.1,
      flexDirection: 'row',
    }
    const enemyStyle = {
      alignSelf: 'flex-end',
      paddingHorizontal: WIDTH * 0.1,
      flexDirection: 'row-reverse',
    }
    return (
      <View style={styles.container}>
        {this.renderUser(me, myStyle)}
        {this.renderVS()}
        {this.renderUser(enemy, enemyStyle)}
      </View>
    )
  }

  render() {
    const {game} = this.props
    switch(game.type) {
      case 'solo': return this.renderSolo();break;
    }
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userTextView: {
    paddingHorizontal: WIDTH * 0.05,

  },
  usernameText: {
    fontSize: 20,
    lineHeight: 30
  },
  ratingText: {
    fontSize: 16,
    lineHeight: 30
  }
});
