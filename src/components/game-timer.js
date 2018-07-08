import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const nop = () => {
  console.log('nop')
};

export class GameTimer extends Component {

  static propTypes = {
    initialTime: PropTypes.number,
    msInterval: PropTypes.number,
    startOnMount: PropTypes.bool,
    onTimeEnd: PropTypes.func,
    onTimeStart: PropTypes.func,
    onPress: PropTypes.func,
  }

  static defaultProps = {
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
        style={styles.timeText}
      >
        {this.state.time}
      </Text>
    )
  }

  render() {
    let {time} = this.state;
    let {initialTime, containerStyle} = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={containerStyle}
      >
        <AnimatedCircularProgress
          prefill={100}
          size={100}
          width={15}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
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
    fontSize: 30,
    fontWeight: 'bold'
  }
});
