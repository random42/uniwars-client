import React, {Component} from 'react';
import {View, Text, ImageBackground } from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { Input, Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import Swiper from 'react-native-swiper';
import StyleSheet from 'react-native-debug-stylesheet';

//source={require('../../images/wallpaper.jpg')}>

const blueColor = "#0074D9"
const greyColor = "#DDDDDD"

@inject('store') @observer
export class Login extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.login;
    this.store.loginType = 0;
  }

  componentDidMount() {
  }

  login() {
    this.store.login();
  }

  onChangeText(text,key) {
    this.store.setForm(text,key);
  }

  phoneView() {
    return (
      <View style={styles.phoneView}>
        <Input
          leftIcon={<Icon name="phone" type="font-awesome" size={25}/>}
          placeholder="Phone number"
          defaultValue={this.store.phoneNumber}
          keyboardType="numeric"
          onChangeText={(text) => this.onChangeText(text,'phoneNumber')}
          autoCapitalize="none"
        />
      </View>
    )
  }

  usernameView() {
    return (
      <View style={styles.loginView}>
        <Input containerStyle={styles.inputView}
          leftIcon={<Icon name="user-o" type="font-awesome" size={25}/>}
          placeholder="Username or e-mail"
          keyboardType="email-address"
          maxLength={254}
          onChangeText={(text) => this.onChangeText(text,'user')}
          autoCapitalize="none"
        ></Input>
        <Input containerStyle={styles.inputView}
          leftIcon={<Icon name="lock" type="feather" size={25}/>}
          placeholder="Password"
          secureTextEntry
          maxLength={255}
          onChangeText={(text) => this.onChangeText(text,'password')}
          autoCapitalize="none"
        />
        <Button
          onPress={() => this.swiper.scrollBy(1,true)}
            containerStyle={styles.phoneLoginButton}>
            <Text style={{fontSize: 15, fontWeight: '600', color: blueColor}}>Login with phone</Text>
            <Icon color="#4267b2" name="navigate-next"  size={25} containerStyle={{marginLeft: 5}}/>
        </Button>
      </View>
    )
  }


  render() {
    return (
      <ImageBackground style={styles.container} >
        <View style={styles.topView}></View>
        <View style={styles.inputsView}>
          <Swiper
            loop
            dotColor={greyColor}
            activeDotColor={"#aaaaaa"}
            ref={(ref) => this.swiper = ref}
            onIndexChanged={(index) => this.store.loginType = index}
            >
            {this.usernameView()}
            {this.phoneView()}
          </Swiper>
        <Button style={styles.loginButtonText}
          onPress={() => this.login()}
          containerStyle={styles.loginButton}>Login</Button>
        </View>
      </ImageBackground>
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
    width: 200
  },
  phoneView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginView: {
    flex: 1,
    backgroundColor: 'red',
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
    width: 200,
    height: 60,
    backgroundColor: 'black',
  },
});
