import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import {Avatar} from 'react-native-elements';

// tempo in cui rimane aperta questa scena
const viewTime = 2000;

@inject('store') @observer
export class GameMatchPreview extends Component {

  componentDidMount() {
    //TODO fetch questions
    setTimeout(() => Actions.push('game-question',{index: 0}),viewTime);
  }

  renderAvatar(image) {
    return (
        <Avatar rounded large
          source={{uri: image}}
          containerStyle={styles.avatarContainer}
        />
    );
  }

  renderTeam(team) {
    const renderMember = ({item}) => (
      <Text style={styles.memberName}>{item.name}</Text>
    );
    return (
      <View style={styles.teamListContainer}>
        <FlatList keyExtractor={(item) => item.id.toString() /*TODO togliere toString() */}
          data={team.members}
          scrollEnabled={false}
          renderItem={renderMember}
          centerContent={true}
          contentContainerStyle={styles.listContainer}
          />
      </View>
    );
  }

  renderVS() {
    return (
      <View style={styles.vsContainer}>
        <Text style={styles.vs}>VS</Text>
      </View>
    );
  }

  renderTeams() {
    let myTeam = this.props.store.game.myTeam;
    let enemyTeam = this.props.store.game.enemyTeam;
    return (
      <View style={styles.container}>
        <View style={styles.teamContainer}>
          {this.renderTeam(myTeam)}
          {this.renderAvatar(myTeam.image)}
        </View>
        {this.renderVS()}
        <View style={styles.teamContainer}>
          {this.renderAvatar(enemyTeam.image)}
          {this.renderTeam(enemyTeam)}
        </View>
      </View>
    );
  }

  renderSolo() {

  }

  render() {
    return this.props.store.game.type === 'solo' ? this.renderSolo() : this.renderTeams();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vsContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamContainer: {
    flex: 3,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  vs: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'orange'
  },
  avatarContainer: {
    //backgroundColor: 'yellow'
  },
  teamListContainer: {
    backgroundColor: 'green',
    borderWidth: 1
  },
  memberName: {

  },
  listContainer: {
    backgroundColor: 'yellow'
  }
});
