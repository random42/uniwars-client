
import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { MyInput } from '../../components';
import { Icon } from 'react-native-elements';

@inject('store') @observer
export class RegisterEmail extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.next = this.next.bind(this);
  }

  next() {
    if (this.props.store.register.validForm.email) {
      //TODO backend check
      if (this.props.type != 'extern') {
        Actions.push('register-form',{type: this.props.type});
      } else {
        Actions.reset('tabs');
      }
    }
  }

  onChangeText(text) {
    this.props.store.register.setForm({email: text});
  }

  render() {
    let valid = this.props.store.register.validForm.email;
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>
          To assure you are attending or have attended a university
          we need your student e-mail address.
        </Text>
        <MyInput
          valid={valid}
          autoCapitalize='none'
          maxLength={254}
          autoCorrect={false}
          returnKeyType='done'
          onChangeText={this.onChangeText}
          keyboardType='email-address'
          leftIcon={<Icon name='ios-mail' type='ionicon' size={30}/>} />
        <Text style={styles.bottomText}>You will have to confirm your e-mail address within 7 days.</Text>
        <Button
          onPress={this.next}
          style={styles.nextButtonText}
          disabled={!valid}
          containerStyle={styles.nextButton} >
          Next</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50
  },
  topText: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 100,
  },
  bottomText: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 40,
  },
  nextButton: {
    marginTop: 40,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
