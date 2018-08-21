import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import PropTypes from 'prop-types';

export class TextLink extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    pageKey: PropTypes.string.isRequired,
    pageProps: PropTypes.object,
    textStyle: PropTypes.object,
    disabled: PropTypes.bool
  }

  render() {
    const {
      text,
      pageKey,
      pageProps,
      textStyle,
      disabled
    } = this.props
    console.log(this.props)
    let _onPress = () => {
      Actions.push(pageKey, pageProps)
    }

    return (
      <TouchableOpacity
        onPress={_onPress}
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
