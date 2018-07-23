import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { GameTimer, GameHeader } from '../../components';
import { GAME_QUESTIONS_NUMBER } from '../../constants';
import PropTypes from 'prop-types';
import _ from 'lodash'
import Api from '../../api'

const TEST = {
  game: "_id",
  question: {
    _id: 'asd',
    question: "What color is Napoleon's white horse?",
    incorrect_answers: ["Black","Red","Yellow"],
    category: "General",
    correct_answer: "White"
  }
}

// TODO send answer api

const WINDOW = Dimensions.get('window')

export class GameQuestion extends Component {

  state = {
    answer: null
  }

  static propTypes = {
    game: PropTypes.string,
    question: PropTypes.object,
  }

  static defaultProps = TEST

  constructor(props) {
    super(props)
    // shuffling answers
    let { incorrect_answers, correct_answer } = props.question
    this.answers = _.shuffle([...incorrect_answers, correct_answer])
  }

  // nextQuestion() {
  //   Actions.push(Actions.currentScene,{index: this.props.index+1});
  // }

  sendAnswer(answer) {
    this.refs.timer.stop()
    this.setState({answer})
    Api.Game.answer({
      game: this.props.game,
      question: this.props.question._id,
      answer
    })
  }

  renderQuestion() {
    return (
      <View style={styles.questionView}>
        <Text style={styles.questionText}>{this.props.question.question}</Text>
      </View>
    );
  }

  renderAnswer(index) {
    let { correct_answer } = this.props.question
    let answer = this.answers[index]
    let style = [styles.answerView]
    if (answer === this.state.answer) {
      if (answer === correct_answer) {
        style.push(styles.rightAnswer)
      } else {
        style.push(styles.wrongAnswer)
      }
    }
    let _onPress = () => { this.sendAnswer(answer) }
    return (
      <Button
        onPress={_onPress}
        containerStyle={style}
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
          <GameTimer
            ref="timer"
            size={70}
            containerStyle={styles.timerView}
          />
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
    justifyContent: 'center',
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
  wrongAnswer: {
    backgroundColor: 'red'
  },
  rightAnswer: {
    backgroundColor: 'green'
  }
});
