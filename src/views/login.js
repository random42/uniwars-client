import React, {Component} from 'react';
import {View, Text, ImageBackground, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { MyInput } from '../components';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import StyleSheet from 'react-native-debug-stylesheet';
import Api from '../api'

//source={require('../../images/wallpaper.jpg')}>

const WINDOW = Dimensions.get('window')
const HEIGHT = WINDOW.height
const WIDTH = WINDOW.width

const blueColor = "#0074D9"
const greyColor = "#DDDDDD"

export class Login extends Component {

  state = {
    user: '',
    password: '',
  }

  login() {
    Api.User.login(this.state).then((user) => {
      console.log(user)
    }).catch((err) => {
      console.log(err)
    })
  }

  onChangeText(text,key) {
    this.setState((s) => {
      s[key] = text
      return s
    })
  }

  renderInputs() {
    return (
      <View style={styles.loginView}>
        <MyInput containerStyle={styles.inputView}
          leftIcon={<Icon name="user-o" type="font-awesome" size={25}/>}
          placeholder="Username or email"
          keyboardType="email-address"
          maxLength={254}
          onChangeText={(text) => this.onChangeText(text,'user')}
          autoCapitalize="none"
        />
        <MyInput containerStyle={styles.inputView}
          leftIcon={<Icon name="lock" type="feather" size={25}/>}
          placeholder="Password"
          secureTextEntry
          maxLength={255}
          onChangeText={(text) => this.onChangeText(text,'password')}
          autoCapitalize="none"
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}></View>
        <View style={styles.inputsView}>
          {this.renderInputs()}
          <Button style={styles.loginButtonText}
            onPress={() => this.login()}
            containerStyle={styles.loginButton}>Login</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    //alignItems: 'center',
  },
  inputsView: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topView: {
    flex: 1,
  },
  inputView: {
    width: 100
  },
  phoneView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  phoneLoginButton: {
    alignSelf: 'flex-end',
  },
  loginButtonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    marginVertical: 40,
    borderRadius: 20,
    justifyContent: 'center',
    width: WIDTH * 0.5,
    height: WIDTH * 0.14,
    backgroundColor: 'black',
  },
});
