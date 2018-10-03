import React, {Component} from 'react'
import {View, Text, StyleSheet} from "react-native"
import { Actions } from "react-native-router-flux"
import { ListItem, Icon } from 'react-native-elements'
import { SearchInput } from '../components'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'

@inject('store') @observer
export class Friends extends Component {


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
