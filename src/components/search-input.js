import React, {Component} from 'react'
import {View, Text, StyleSheet} from "react-native"
import { Input, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { WINDOW } from '../constants'


/**
 * Input with search icon on the right that becomes
 * an X that clears input on press.
 * 
 * @reactProps {Object} ...Input.propTypes see 'react-native-elements' Input
 * @reactProps {function(text: string)} onChangeText Main one to know e.e
 */

export class SearchInput extends Component {

  static propTypes = Input.propTypes

  render() {
    const icon = this.props.defaultValue !== '' ?
      (<Icon
        name="cancel"
        onPress={() => {
          this.refs.input.clear()
          this.props.onChangeText && this.props.onChangeText('')
        }}
      />)
        :
      (<Icon
        type="feather"
        name="search"
      />)
    return (
      <Input
        ref="input"
        containerStyle={styles.container}
        inputContainerStyle={styles.input}
        rightIcon={icon}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: WINDOW.width,
    justifyContent: 'center',
  },
  input: {
    marginHorizontal: WINDOW.width * 0.1
  }
});
