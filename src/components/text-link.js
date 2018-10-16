import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';


/**
 * Underlined text wrapped in a TouchableOpacity
 *
 * @see https://facebook.github.io/react-native/docs/touchableopacity
 * 
 * @reactProps {!string} text
 * @reactProps {function} onPress
 * @reactProps {Object} textStyle Will override default style
 * @reactProps {boolean} disabled
 */
export class TextLink extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    textStyle: Text.propTypes.style,
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
