import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList, Dimensions} from "react-native";

export class Classifica extends Component {

  render() {
    return (
      <View style={[styles.view, this.props.containerStyle]}>
        <View style={{height: 30, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "purple"}}>
            <Button
              onPress={this.top5Uni}
              title="TOP 5 UNIVERSITY"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            /> 
            <Button
              onPress={this.top5Players}
              title="TOP 5 PLAYERS"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            /> 
        </View>
      </View>
    );
  }

  top5Uni() {
    Actions.game();
  }

  top5Players() {
    Actions.game();
  }

}



const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 20,
    backgroundColor: 'blue',
    width: Dimensions.get('window').width * .75,
    height: Dimensions.get('window').height * .7,
    borderRadius: 20,
  }
})
