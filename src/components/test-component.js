import React, {Component} from 'react';
import {View, Text, StyleSheet, WebView, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import { RankList } from './index';
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';

const WINDOW = Dimensions.get('window')

@inject('store') @observer
export class TestComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <RankList
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
});
