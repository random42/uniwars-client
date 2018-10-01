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

const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height / 8
const WIDTH = WINDOW.width

export class GameHeader extends Component {

  static propTypes = {
    left: PropTypes.shape({
      name: PropTypes.string,
      points: PropTypes.number,
      picture: PropTypes.string
    }),
    right: PropTypes.shape({
      name: PropTypes.string,
      points: PropTypes.number,
      picture: PropTypes.string
    })
  }

  render() {
    const { left, right } = this.props
    return (
      <View id="container" style={[this.props.containerStyle,styles.container]}>
        <View id="avatarLevel" style={styles.avatarsLevel}>
          <Avatar size={HEIGHT * 0.8} name={left.name} src={left.picture} />
          <Text style={[styles.point, styles.leftPoint]}>{left.points}</Text>
          <View id="vs" style={styles.vs}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <Text style={[styles.point, styles.rightPoint]}>{right.points}</Text>
          <Avatar size={HEIGHT * 0.8} name={right.name} src={right.picture} />
        </View>
        <View id="nameLevel" style={styles.namesLevel}>
          <View id="leftName" style={[styles.nameView, styles.leftNameView]}>
            <Text style={[styles.nameText]}>{left.name}</Text>
          </View>
          <View id="rightName" style={[styles.nameView, styles.rightNameView]}>
            <Text style={[styles.nameText]}>{right.name}</Text>
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
    fontWeight: '400',
    marginHorizontal: 15,
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
  leftPoint: {
    left: -(HEIGHT * 0.55)
  },
  rightPoint: {
    left: (HEIGHT * 0.55)
  }
});
