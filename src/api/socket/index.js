import main, { manager } from './main';
import chat from './chat';
import game from './game';
import store from '../../store';
import _ from 'lodash/core';
import { when } from 'mobx';


function connect() {
  main.open();
  return when(() => store.api.isSocketConnected);
}

module.exports = {
  main,
  game,
  chat,
  manager,
  connect
}
