import main, {game, chat, manager} from './main';
import store from '../../store';
import _ from 'lodash/core';
import { when } from 'mobx';


async function connect() {
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
