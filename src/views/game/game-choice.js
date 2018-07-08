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
  }

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
              <Image source={require('./../../../assets/gameChoice_randomTeam.jpg')} style={styles.backgroundImage} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.titleText}>Gioca in singolo</Text>
              <Text style={styles.baseText}>Sfida altri giocatori in sfide uno contro uno</Text>
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
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: "column",
  },
  head: {
    flex:1,
  },
  backgroundImage:{
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottom: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex:1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 35,
  },
  baseText: {
    fontSize: 12,
    marginTop: 15,
    width: 150,
    color: 'grey',
    textAlign: 'center',
  },
});
