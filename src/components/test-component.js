import React, {Component} from 'react';
import {View, Text, StyleSheet, WebView, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import { RankList } from './index';
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';
import { WINDOW } from '../constants'

@inject('store') @observer
export class TestComponent extends Component {

  state = {
    num: 10
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.numero}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
