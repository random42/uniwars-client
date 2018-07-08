import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import Carousel from "react-native-carousel-control";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export class CircularStats extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      hit: PropTypes.number,
      miss: PropTypes.number
    })),

  }

  static defaultProps = {
    stats: [],
  }

  componentDidMount() {

  }

  renderStat(item, index, arr) {
    let fill = (item.hit / (item.hit + item.miss)) * 100;
    return (
      <View key={item.name}
        style={styles.pageStyle}
      >
        <Text>{item.name}</Text>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >{(fill) => (<Text>{fill.toFixed(2)}</Text>)}
        </AnimatedCircularProgress>
      </View>
    )
  }

  render() {
    let {containerStyle, stats} = this.props;
    return (
      <View style={containerStyle}>
      <Carousel
        sneak={100}
        pageWidth={200}
        initialPage={Math.floor(stats.length / 2)}
      >
        {stats.map(this.renderStat)}
      </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageStyle: {
    flex: 1,
    // backgroundColor: "yellow",
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
