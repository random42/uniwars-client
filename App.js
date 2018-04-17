import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as Store from './src/store';
import {Provider} from 'mobx-react/native';
import * as mobx from 'mobx';
import {MyRouter} from './src/router';

console.disableYellowBox = true;
mobx.useStrict(true);

//loadLanguage('en-US').then(() => console.log('language'));

let store = {
  chat: new Store.ChatStore(),
  register: new Store.RegisterStore(),
  rank: new Store.RankStore(),
  profile: new Store.ProfileStore(),
  game: new Store.GameStore(),
  login: new Store.LoginStore(),
}

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
