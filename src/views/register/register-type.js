import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class RegisterType extends Component {

  login() {
    Actions.push('login')
  }

  register(type) {
    Actions.push('register',{type})
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}></View>
        <View style={styles.buttonsView}>
          <Button
            containerStyle={[styles.button,styles.fbButton]}
            style={styles.fbText}
            onPress={() => this.register('extern')}>
            <Image source={require('../../../images/facebook-logo.png')}
                style={styles.logo}/>
              Sign in with Facebook
          </Button>
          <Button
            containerStyle={[styles.button,styles.googleButton]}
            style={styles.googleText}
            onPress={() => this.register('extern')}>
            <Image source={require('../../../images/google-logo.png')}
                style={styles.logo}/>
              Sign in with Google
          </Button>
          <Button containerStyle={[styles.button,styles.signUpPhone]}
            style={styles.signUpText}
            onPress={() => this.register('phone')}>
            Sign up with phone number
          </Button>
          <Button containerStyle={[styles.button,styles.signUpPassword]}
            style={styles.signUpText}
            onPress={() => this.register('password')}>
            Sign up with password
          </Button>
        </View>
        <Text style={styles.already}>Have you already got an account?</Text>
        <Button containerStyle={styles.loginButton}
          style={styles.loginButtonText}
          onPress={this.login}>Login</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginVertical: 50,
  },
  topView: {
    flex: 1,
  },
  buttonsView: {
    flex: 1.3,
    justifyContent: 'space-around',
  },
  button: { // for first three buttons
    height: 50,
    width: 250,
    borderRadius: 10,
    justifyContent: 'center'
  },
  fbButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  logo: {
    height: 35,
    width: 35,
    marginLeft: 20,
  },
  googleText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'grey'
  },
  fbText: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  signUpPhone: {
    backgroundColor: '#eea259',
  },
  signUpPassword: {
    backgroundColor: '#eea259'
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  loginButton: {

  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  already: {
    marginTop: 30
  },
});
