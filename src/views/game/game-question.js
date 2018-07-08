import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { GameTimer, GameHeader } from '../../components';
import { GAME_QUESTIONS_NUMBER } from '../../constants';
import PropTypes from 'prop-types';

const TEST = {
  question: "What color is Napoleon's white horse?",
  answers: ["Black","Red","White","Yellow"],
  category: "General",
  correctAnswer: "White"
}

const WINDOW = Dimensions.get('window')

export class GameQuestion extends Component {

  static propTypes = {
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    correctAnswer: PropTypes.string
  }

  static defaultProps = TEST

  constructor(props) {
    super(props);
  }

  // nextQuestion() {
  //   Actions.push(Actions.currentScene,{index: this.props.index+1});
  // }

  sendAnswer(answer) {
    // TODO animation
    console.log(answer === this.question.answers ? 'Correct!' : 'Wrong!');
  }

  renderQuestion() {
    return (
      <View style={styles.questionView}>
        <Text style={styles.questionText}>{this.props.question}</Text>
      </View>
    );
  }

  renderAnswer(index) {
    let {answers} = this.props;
    let answer = answers[index];
    let _onPress = () => { this.sendAnswer(answer)};
    return (
      <Button
        onPress={_onPress}
        containerStyle={styles.answerView}
        style={styles.answerText}
      >
        {answer}
      </Button>
    );
  }

  renderAnswers() {
    return (
      <View style={styles.answersView}>
        {this.renderAnswer(0)}
        {this.renderAnswer(1)}
        {this.renderAnswer(2)}
        {this.renderAnswer(3)}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <GameHeader containerStyle={styles.header}/>
        <View style={styles.content}>
          <GameTimer size={70} containerStyle={styles.timerView}/>
          {this.renderQuestion()}
          {this.renderAnswers()}
        </View>
        <View style={styles.ads}>
          <Text style={{fontSize: 25,fontWeight: 'bold',color: 'white'}}>PUBBLICITA</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
  },
  content: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ads: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerView: {
    flex: 1.8,
    top: -10
  },
  questionView: {
    flex: 2,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#99ea86'
  },
  answersView: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  answerView: {
    flex: 1,
    width: WINDOW.width * 0.7,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightsalmon',
    borderRadius: 10
  },
  answerText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal'
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
