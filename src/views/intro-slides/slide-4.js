import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class Slide4 extends Component {

  login() {
    Actions.reset('login');
  }

  register() {
    Actions.reset('register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.login}
          containerStyle={styles.loginButton}
          style={styles.loginButtonText}>
          Login
        </Button>
        <Button onPress={this.register}
          containerStyle={styles.registerButton}
          style={styles.registerButtonText}>
          Register
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginButton: {

  },
  registerButton: {

  },
  registerButtonText: {

  },
  loginButtonText: {

  }
});
