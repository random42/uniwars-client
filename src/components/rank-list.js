import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList } from "react-native"
import { TextLink } from './index'
import { Actions } from 'react-native-router-flux'
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
  titleStyle: {

  },
  onEndReached: () => {
    console.log('onEndReached')
  },
  onPressItem: (item, index, arr) => Actions.push('user', { _id: item._id}),
  containerStyle: {
    borderWidth: 1
  }
}

for (let i in [0,1,2,3]) {
  TEST.data = TEST.data.concat(TEST.data)
}


/**
 * Shows index, name and rating of some data with rating on the far right.
 * If onPressName is passed, {@link TextLink} will be used for name text and
 * thus it will be underlined.
 *
 * |-1--Name------1234|
 *
 * |-1--Name------1234|
 *
 * |-1--Name------1234|
 *
 * |-1--Name------1234|
 *
 * @reactProps {Object} containerStyle
 * @reactProps {Array<{_id: string, name: string, rating: number}>} data
 * @reactProps {string} title
 * @reactProps {Object} titleStyle
 * @reactProps {function(item : Object, index : number)} onPressName
 * @reactProps {function} onEndReached Usually to load other data
 *
 */

export class RankList extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      rating: PropTypes.number
    })),
    title: PropTypes.string,
    onPressName: PropTypes.func, // (item) => { pageKey, pageProps }
    onEndReached: PropTypes.func, // FlatList prop
    containerStyle: View.propTypes.style
  }

  static defaultProps = TEST

  renderRow = ({item, index}) => {
    const { onPressName } = this.props
    let name = <Text style={styles.name}>{item.name}</Text>
    if (onPressName) {
      const linkProps = {
        textStyle: styles.name,
        text: item.name,
        onPress: () => onPressName(item, index)
      }
      name = <TextLink  {...linkProps}></TextLink>
    }
    return (
      <View style={styles.rowView}>
        <Text style={styles.rank}> {index + 1}</Text>
        {name}
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    )
  }

  renderTitle() {
    const { title } = this.props
    return (
      <Text style={[styles.title,]}>{title}</Text>
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
