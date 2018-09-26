import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from "react-native";
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const PERCENTAGE_PRECISION = 2; // digits after comma
const WINDOW = Dimensions.get('window');

/*
  Statistiche circolari da scorrere orizzontalmente
*/
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

  renderStat({item, index}) {
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
        >{(fill) => (<Text>{fill.toFixed(PERCENTAGE_PRECISION)}</Text>)}
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
