import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import BouncingPreloader from 'react-native-bouncing-preloader';


/**
 * Loading view, for now it's just two bouncing images
 *
 * @reactProps {Object} BouncingPreloader.propTypes see 'react-native-bouncing-preolader'
 *
 */

export class Loading extends Component {

  render() {
    return (
      <View style={styles.container}>
        <BouncingPreloader
          {...this.props}
          icons={[
          'https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png',
          'https://www.shareicon.net/data/256x256/2017/07/11/888365_cookie_512x512.png',
          ]}
          leftRotation="-680deg"
          rightRotation="360deg"
          leftDistance={-180}
          rightDistance={-250}
          speed={1200} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
