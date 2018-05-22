import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from "react-native";

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
  }

  static defaultProps = {
    initialTime: 10,
    msInterval: 1000,
    startOnMount: false,
    onTimeEnd: nop,
    onTimeStart: nop
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
        if (prevState.time === 0) {
          this.stop();
          this.props.onTimeEnd();
          return prevState;
        } else {
          return {
            time: prevState.time - 1
          }
        }
      })
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

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.time}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
