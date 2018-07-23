import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class GameEnd extends Component {

  static propTypes = {
    result: PropTypes.number
  }


  render() {
    let { result } = this.props
    let text
    switch (result) {
      case 1: {
        text = "Hai vinto!"
        break
      }
      case 0.5: {
        text = "Pareggio"
        break
      }
      case 0: {
        text = "Hai perso!"
        break
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white'
  }
});
