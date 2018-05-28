import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import store from './src/store';
import {Provider} from 'mobx-react/native';
import * as mobx from 'mobx';
import {MyRouter} from './src/router';
import * as Api from './src/api';

console.disableYellowBox = true;
mobx.useStrict(true);

Api.socket.connect().catch((err) => {
  console.log(err);
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <MyRouter />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});
