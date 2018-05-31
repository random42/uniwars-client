import main, { manager} from './main';
import chat from './chat';
import game from './game';
import store from '../../store';
import _ from 'lodash/core';
import { when } from 'mobx';


function connect() {
  main.open();
  return when(() => {
    let connections = store.api.socket;
    for (let connected of _.values(connections)) {
      if (!connected)
        return false;
    }
    return true;
  })
}

module.exports = {
  main,
  game,
  chat,
  manager,
  connect
}
