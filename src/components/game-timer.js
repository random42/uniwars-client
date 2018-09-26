import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const nop = () => {
}

export class GameTimer extends Component {

  static RATIOS = {
    text: 0.3,
    progressWidth: 0.15
  }

  static propTypes = {
    size: PropTypes.number,
    initialTime: PropTypes.number,
    msInterval: PropTypes.number,
    startOnMount: PropTypes.bool,
    onTimeEnd: PropTypes.func,
    onTimeStart: PropTypes.func,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    size: 80,
    initialTime: 10,
    msInterval: 1000,
    startOnMount: true,
    onTimeEnd: nop,
    onTimeStart: nop,
    onPress: nop
  }

  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      time: Math.floor(props.initialTime)
    }
  }

  componentDidMount() {
    this.props.startOnMount && this.start()
  }

  start() {
    this.props.onTimeStart();
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        let { time } = prevState;
        if (time === 0) {
          return prevState;
        }
        else {
          return { time: time - 1}
        }
      })
      if (this.state.time === 0) {
        this.stop();
        this.props.onTimeEnd();
      }
    }, this.props.msInterval);
  }

  stop() {
    clearInterval(this.interval);
  }

  setTime(time) {
    this.setState(prevState => {
      return {
        time: Math.floor(time)
      }
    })
  }

  renderTime() {
    return (
      <Text
        style={{fontWeight: 'bold', fontSize: this.props.size * GameTimer.RATIOS.text}}
      >
        {this.state.time}
      </Text>
    )
  }

  render() {
    const {time} = this.state;
    const {onPress, initialTime, containerStyle, size} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={containerStyle}
      >
        <AnimatedCircularProgress
          prefill={100}
          size={size}
          width={size*GameTimer.RATIOS.progressWidth}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={0}
          fill={(time/initialTime)*100}
        >
          {(fill) => {
            return this.renderTime()
          }}
        </AnimatedCircularProgress>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  timeText: {

  }
});
