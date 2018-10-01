import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Actions } from "react-native-router-flux"
import Button from 'react-native-button'
import Api from '../api'
import { inject, observer } from 'mobx-react/native'
import { RankList } from '../components'
import Carousel from 'react-native-snap-carousel'
import _ from 'lodash/core'

const SLIDES = [
   {
     key: 'users',
     props: {
       title: 'Players',
     },
     loadData: (length) => {
       return Api.User.top({from: length, to: length + PAGE_LENGTH})
     },
     mapData: (item, index, arr) => {
       return {
         _id: item._id,
         name: item.username,
         rating: item.perf.rating
       }
     }
   },
   {
     key: 'teams',
     props: {
       title: 'Teams'
     },
     loadData: (length) => {
       return Api.Team.top({from: length, to: length + PAGE_LENGTH})
     },
     mapData: (item, index, arr) => {
       return {
         _id: item._id,
         name: item.name,
         rating: item.rating
       }
     }
   },
   {
     key: 'unis',
     props: {
       title: 'Universities'
     },
     loadData: (length) => {
       return Api.Uni.top({from: length, to: length + PAGE_LENGTH})
     },
     mapData: (item, index, arr) => {
       return {
         _id: item._id,
         name: item.name,
         rating: item.perf.rating
       }
     }
   }
 ]
const PAGE_LENGTH = 20
const WINDOW = Dimensions.get('window')
const SLIDE_WIDTH = 0.7

@inject('store') @observer
export class Rank extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    for (let s of SLIDES) {
      this.state.data[s.key] = []
    }
    console.log(this.state)
  }

  onEndReached = (key, dataLength) => {
    // TODO
    return
    const slide = _.find(SLIDES, {key})
    slide.loadData(dataLength).then((data) => {
      data = data.map(slide.mapData)
      this.setState((prev) => {
        prev.data[key] = prev.data[key].concat(data)
        return prev
      })
    }).catch((err) => console.log(err))
  }

  componentDidMount() {
  }

  renderSlide = ({item, index}) => {
    const { key } = item
    const data = this.state.data[key]
    return (
      <RankList {...item.props}
        containerStyle={styles.slide}
        onEndReached={() => {
          this.onEndReached(key, data.length)
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel ref="carousel"
          data={SLIDES}
          loop
          itemWidth={SLIDE_WIDTH * WINDOW.width}
          sliderWidth={WINDOW.width}
          renderItem={this.renderSlide}
          contentContainerCustomStyle={{alignItems: "center"}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SLIDE_WIDTH * WINDOW.width,
    height: WINDOW.height * 0.8,
    borderWidth: 1,
  }
})
