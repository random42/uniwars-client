import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { WINDOW, STATS_PERCENTAGE_PRECISION } from '../constants'

/**
  Horizontal carousel with circular percentage fill
  @reactProps {Array<{name: string, fill: number}>} data Array of statistics
  @reactProps {number} data[].fill Percentage to show (number between 0 and 1)
*/
export class CircularStats extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      fill: PropTypes.number,
    })),
  }

  static defaultProps = {
    data: []
  }

  renderStat({item, index}) {
    let { fill } = item
    return (
      <View key={item.name}
        style={styles.pageStyle}
      >
        <Text>{item.name}</Text>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={fill * 100}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >{(fill) => (<Text>{fill.toFixed(STATS_PERCENTAGE_PRECISION)}</Text>)}
        </AnimatedCircularProgress>
      </View>
    )
  }

  render() {
    let {containerStyle, stats} = this.props;
    return (
      <View style={containerStyle}>
      <Carousel
        data={stats}
        enableSnap={true}
        firstItem={Math.floor(stats.length/2)}
        renderItem={this.renderStat}
        itemWidth={WINDOW.width/2}
        sliderWidth={WINDOW.width}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.6}
      />
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
