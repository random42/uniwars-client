import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {Actions} from "react-native-router-flux";

export class GameChooseTeam extends Component {
  render(){
        return (
            <View style={styles.container}>
                <Text>GameChooseTeam Screen</Text>
                <Button title="Login" onPress={Actions.login}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});
