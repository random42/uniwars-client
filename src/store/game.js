import { observable, action, computed, toJS } from 'mobx';
import _ from 'lodash/core';

export class GameStore {

  constructor() {
    this.searching = null; // can be any game type
    this.current = null;
    this.games = [];
  }

  @observable playing = false;

  setCurrent(_id) {
    let index = _.findIndex(this.games, {_id});
    this.current = this.games[index];
  }
}
