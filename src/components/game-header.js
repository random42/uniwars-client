import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
//import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';
import Avatar from 'react-native-user-avatar';
import { WINDOW } from '../constants'

const HEIGHT = WINDOW.height / 8
const WIDTH = WINDOW.width


const TEST = {
  left : {
    name: 'asd',
    points: 2,
    picture: 'data:image/jpeg;base64,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'
  },
  right : {
    name: 'asd',
    points: 2,
    picture: 'data:image/jpeg;base64,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'
  }
}
/**
  Game header on question page.
  @reactProps {{name: string, points: number, picture: string}} left Left side
  @reactProps {{name: string, points: number, picture: string}} right Right side
*/

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

  static defaultProps = TEST

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
    )
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
