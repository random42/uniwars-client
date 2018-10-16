import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Input, Icon } from 'react-native-elements';
import PropTypes from 'prop-types'
import Button from 'react-native-button';


/**
 * Custom text input Displays right icon that represents the validity of the input
 * @reactProps {boolean} valid No icon if undefined
 * @reactProps {Object} ...TextInput.propStyle See react-native docs
 * @reactProps {Object} ...Input.propStyle See 'react-native-elements'
 */

export class MyInput extends Component {

  static propTypes = {
    valid: PropTypes.bool,
    ...TextInput.propTypes,
    ...Input.propTypes
  }

  componentDidMount() {
  }

  renderValid() {
    switch (this.props.valid) {
      case undefined :
        return
      case (true) :
        return (<Icon name='md-checkmark-circle-outline' type='ionicon' color='green' size={30} />);
      case (false):
        return (
        <Button
          onPress={() => {
          this.input.clear();
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
        <Input ref={ref => this.input = ref.input}
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
