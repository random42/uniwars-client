import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import { GameTimer } from './index';
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class TestComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <GameTimer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
