import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { GAME_QUESTIONS_NUMBER } from '../../constants';

@inject('store') @observer
export class GameQuestion extends Component {

  constructor(props) {
    super(props);
    this.game = this.props.store.game;
    this.question = this.game.questions[this.props.index];
  }

  nextQuestion() {
    Actions.push(Actions.currentScene,{index: this.props.index+1});
  }

  sendAnswer(answer) {
    // TODO animation
    console.log(answer === this.question.answers ? 'Correct!' : 'Wrong!');
    if (this.props.index === GAME_QUESTIONS_NUMBER-1) {
      // TODO finish game
    } else {
      this.nextQuestion();
    }
  }

  renderQuestion() {
    return (
      <View style={styles.questContainer}>
        <Text>{this.question.question}</Text>
      </View>
    );
  }

  renderOption(optionIndex) {
    let _onPress = () => { this.sendAnswer(optionIndex)};
    let key = 'option'+optionIndex;
    let option = this.question[key];
    return (
      <Button onPress={_onPress}
        containerStyle={styles.optionContainer} >
        {option}
      </Button>
    );
  }

  renderOptions() {
    return (
      <View style={styles.optionsContainer}>
        <View style={styles.halfOptions}>
          {this.renderOption(1)}
          {this.renderOption(2)}
        </View>
        <View style={styles.halfOptions}>
          {this.renderOption(3)}
          {this.renderOption(4)}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.content}>
          {this.renderQuestion()}
          {this.renderOptions()}
        </View>
        <View style={styles.ads}>
          <Text style={{fontSize: 25,fontWeight: 'bold',color: 'white'}}>PUBBLICITA</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'red',
  },
  content: {
    flex: 6,
    margin: 20,
    justifyContent: 'space-around'
  },
  ads: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  questContainer: {
    flex: 2,
    borderWidth: 1,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'magenta'
  },
  optionsContainer: {
    flex: 3,
    borderWidth: 1,
    backgroundColor: 'yellow'
  },
  halfOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  optionContainer: {
    height: 70,
    width: 150,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'lightsalmon'
  }
});
