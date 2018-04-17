import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';


export class GameChoice extends Component {

  play() {
    Actions.push('game-match-preview');
  }

  playAlone() {
  }

  playUni() {

  }

  playTeam() {

  }

  createTeam() {

  }

  renderButton(text,func) {
    return (
      <Button onPress={this.play}
      containerStyle={styles.buttonContainer}
      style={styles.buttonText}>
        {text}
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.half}>
          {this.renderButton('Play alone',this.playAlone)}
          {this.renderButton('Play for your uni',this.playUni)}
        </View>
        <View style={styles.half}>
          {this.renderButton('Create your team',this.createTeam)}
          {this.renderButton('Play with your team',this.playTeam)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    half: {
      backgroundColor: 'yellow',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonContainer: {
      margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height:100,
      overflow: 'hidden',
      borderRadius:4,
      backgroundColor: 'orange'
    },
    buttonText: {
      fontSize: 20
    }
});
