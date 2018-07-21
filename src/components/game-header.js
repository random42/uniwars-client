import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
//import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';
import Avatar from 'react-native-user-avatar';

// let before = (      <View style={[this.props.containerStyle,styles.container]}>
//         <Avatar containerStyle={styles.avatar} large rounded source={{uri: me}}></Avatar>
//         <Text style={styles.name}>Roberto Sero</Text>
//         <Text style={styles.vs}>VS</Text>
//         <Text style={styles.name}>Son Goku</Text>
//         <Avatar containerStyle={styles.avatar} large rounded source={{uri: goku}}></Avatar>
//       </View>)

let goku = "https://images.everyeye.it/img-notizie/dragon-ball-super-toyotaro-disegna-goku-ultra-istinto-in-versione-manga-v3-329799-1280x720.jpg"
let me = "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4"

const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height / 8
const WIDTH = WINDOW.width

export class GameHeader extends Component {

  static propTypes = {
    users: PropTypes.array
  }

  static defaultProps = {
    users: []
  }

  render() {
    return (
      <View style={[this.props.containerStyle,styles.container]}>
        <View style={styles.avatarsLevel}>
          <Avatar size={HEIGHT * 0.8} name="Roberto Sero" src={me} />
          <Text style={[styles.point,styles.point0]}>6</Text>
          <View style={styles.vs}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <Text style={[styles.point,styles.point1]}>8</Text>
          <Avatar size={HEIGHT * 0.8} name="Son Goku" src={goku} />
        </View>
        <View style={styles.namesLevel}>
          <View style={[styles.nameView,styles.leftNameView]}>
            <Text style={[styles.nameText,{marginHorizontal: 15}]}>Roberto Sero</Text>
          </View>
          <View style={[styles.nameView,styles.rightNameView]}>
            <Text style={[styles.nameText, {marginHorizontal: 15}]}>Son Goku</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT,
    height: HEIGHT
  },
  namesLevel: {
    flex: 1,
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
  },
  avatarsLevel: {
    flex: 1,
    position: 'absolute',
    width: WIDTH - 20,
    height: HEIGHT,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    //backgroundColor: 'yellow',
    alignItems: 'center',
  },
  avatar: {
  },
  nameView: {
    backgroundColor: 'white',
    margin: 3,
    height: 50,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center'
  },
  leftNameView: {
    alignItems: 'flex-end',
  },
  rightNameView: {
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '400'
  },
  vs: {
    backgroundColor: 'black',
    height: 25,
    width: 25,
    borderRadius: 25/2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vsText: {
    color: 'white',
    fontWeight: 'bold'
  },
  point: {
    //backgroundColor: 'yellow',
    //justifyContent: 'center',
    textAlign: 'center',
    height: HEIGHT * 0.4,
    width: HEIGHT * 0.4,
    top: HEIGHT * 0.35,
    fontSize: 26,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  point0: {
    left: -(HEIGHT * 0.55)
  },
  point1: {
    left: (HEIGHT * 0.55)
  }
});
