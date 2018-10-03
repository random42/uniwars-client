import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { inject, observer } from 'mobx-react/native';
import {Actions} from "react-native-router-flux";
import { Button } from 'react-native-elements';
import Carousel from "react-native-carousel-control";
import { Font } from "expo"
import Api from "../../api"
import { WINDOW } from '../../constants'
const HEIGHT = WINDOW.height
const WIDTH = WINDOW.width

@inject('store')
export class GameChoice extends Component {
  state = {
    currentIndex: 0,
  }

  play() {
    this.props.store.game.searching = 'solo'
    Api.Game.search({type: 'solo'})
  }

  renderButton(text,func) {
    return (
      <Button >
        {text}
      </Button>
    );
  }

  render = () => {
    // center items on screen
    const { width } = Dimensions.get('window');
    /* const contentOffset = (width - View.WIDTH) / 2 */

    return (
      <View style={styles.container}>
        <Carousel currentPage={0}>

          <View style={styles.carouselPage}>
            <View style={styles.head}>
              <Image source={require('./../../../assets/gameChoice_randomTeam.jpg')} style={styles.backgroundImage} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.titleText}>Gioca in singolo</Text>
              <Text style={styles.baseText}>Sfida altri giocatori in sfide uno contro uno</Text>
              <Button
                onPress={() => this.play()}
                title="Play"
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
              />
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
    justifyContent: 'space-around'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginTop: 35,
  },
  baseText: {
    fontSize: 12,
    //marginTop: 15,
    width: 150,
    color: 'grey',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    width: WIDTH * 0.35,
    height: WIDTH * 0.12
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold'
  }
});
