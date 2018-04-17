import React, {Component} from 'react';
import {View, Text, StyleSheet } from "react-native";
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper';
import Translate from '../i18n';
import { Slide1, Slide2, Slide3 } from './intro-slides';
import { RegisterType } from './register';

export class Intro extends Component {

  constructor(props) {
    super(props);
    this.scrollBy = this.scrollBy.bind(this);
  }

  scrollBy(index,animation) {
    this.swiper.scrollBy(index,animation);
  }

  render() {
      return (
        <Swiper loop={false}
          style={styles.wrapper}
          showsButtons={true}
          ref={ref => this.swiper = ref}
          index={3}>
          <Slide1 scrollBy={this.scrollBy}/>
          <Slide2 scrollBy={this.scrollBy}/>
          <Slide3 scrollBy={this.scrollBy}/>
          <RegisterType scrollBy={this.scrollBy}/>
        </Swiper>
      );
    }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white'
  },
})
