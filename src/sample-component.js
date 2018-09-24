import React, {Component} from 'react'
import {View, Text, StyleSheet} from "react-native"
import {Actions} from "react-native-router-flux"
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'

@inject('store') @observer
export class C/*TODO change */ extends Component {

  static propTypes = {
    a: PropTypes.number,
    b: PropTypes.func,
    c: PropTypes.bool
  }

  static defaultProps = {
    a: 1,
    b: () => 2,
    c: true
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
