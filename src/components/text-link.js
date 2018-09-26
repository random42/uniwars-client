import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';

export class TextLink extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    textStyle: PropTypes.object,
    disabled: PropTypes.bool
  }

  render() {
    const {
      text,
      onPress,
      textStyle,
      disabled
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
});
