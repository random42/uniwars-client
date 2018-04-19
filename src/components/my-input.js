import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import { Input, Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class MyInput extends Component {

  componentDidMount() {
    this.props.inputRef && this.props.inputRef(this.input.input);
  }

  renderValid() {
    switch (this.props.valid) {
      case undefined :
        return undefined;
      case (true) :
        return (<Icon name='md-checkmark-circle-outline' type='ionicon' color='green' size={30} />);
      case (false):
        return (
        <Button
          onPress={() => {
          this.input.input.clear();
          this.props.onChangeText('',this.props.name);
          }}><Icon name='ios-close-circle-outline'
            type='ionicon'
            color='red'
            size={30}/>
        </Button>);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input ref={ref => this.input = ref}
          {...this.props}
          containerStyle={styles.input}
        />
        <View style={{width: 30}}>
          {this.renderValid()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    //alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {

  },
  input: {},
});
