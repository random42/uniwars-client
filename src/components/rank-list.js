import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList } from "react-native"
import { TextLink } from './index'
import PropTypes from 'prop-types'

let TEST = {
  data: [
    {
      _id: '1',
      name: 'albero',
      rating: 2542
    },
    {
      _id: '2',
      name: 'ciao',
      rating: 2321
    },
    {
      _id: '3',
      name: 'asd',
      rating: 1233
    }
  ],
  title: "Top players",
  onEndReached: () => {
    console.log('onEndReached')
  }
}

for (let i in [0,1,2,3]) {
  TEST.data = TEST.data.concat(TEST.data)
}

export class RankList extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      rating: PropTypes.number
    })),
    title: PropTypes.string,
    linkExtractor: PropTypes.func, // (item) => { pageKey, pageProps }
    onEndReached: PropTypes.func, // FlatList prop
    containerStyle: PropTypes.object
  }

  static defaultProps = TEST

  renderRow = ({item, index}) => {
    const { linkExtractor } = this.props
    let name = <Text style={styles.name}>{item.name}</Text>
    if (linkExtractor) {
      const linkProps = {
        text: item.name,
        ...(linkExtractor(item))
      }
      name = <TextLink textStyle={styles.name} {...linkProps}></TextLink>
    }
    return (
      <View style={styles.rowView}>
        <Text style={styles.rank}> {index + 1}</Text>
        {name}
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    )
  }

  keyExtractor(item, index) {
    return item._id
  }

  renderTitle() {
    const { title } = this.props
    return (
      <Text style={styles.title}>{title}</Text>
    )
  }

  render() {

    const {
      data,
      onEndReached,
      containerStyle
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderTitle()}
        <FlatList
          data={data}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    paddingVertical: '5%'
  },
  rowView: {
    flexDirection: 'row'
  },
  rank: {
    width: '10%'
  },
  name: {
    width: '40%'
  },
  rating: {
    textAlign: 'right',
    width: '50%',
    paddingRight: 10,
  }
});
