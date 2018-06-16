import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { Dimensions } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Font } from "expo"

export class GameChoice extends Component {
  state = {
    currentIndex: 0,
  };
  
  play() {
    Actions.push('game-match-preview');
  }

  renderButton(text,func) {
    return (
      <Button onPress={this.play}
      containerStyle={styles.buttonContainer}
      style={styles.buttonText}>
        {text}
      </Button>
    );
  }



  render = () => {
    // center items on screen
    const { width } = Dimensions.get('window');
    /* const contentOffset = (width - View.WIDTH) / 2; */

    return (
      <View style={styles.container}>
        <Carousel currentPage={1}>

          <View style={styles.carouselPage}>
            <View style={styles.head}>
              <Image style={{borderRadius: 20}} source={require('./../../../assets/gameChoice_randomTeam.jpg')} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.baseText}>Gioca in singolo</Text>
              <Text style={styles.titleText}>Allenati contro </Text>
            </View>
          </View>

        </Carousel>
      </View>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  },
  carouselPage: {
    borderRadius: 20,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    backgroundColor: "yellow",
    flexDirection: "column",
  },
  head: {
    borderRadius: 20,
    flex:1,
    backgroundColor: "black",
  },
  bottom: {
    borderRadius: 20,
    flex:1,
    backgroundColor: "white"
  },
  baseText: {
    /* fontFamily: 'arial', */
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
