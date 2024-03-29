import { observable, action, computed, toJS, extendObservable } from 'mobx';
import _ from 'lodash/core';

const TEST = {
  "_id": "5abbd98270534c2bf947416c",
  "created_at": Date.now(),
  "ended_at": Date.now(),
  "type": "solo", // solo, squad, team
  "players": [{
    "_id" : "",
    "side": 0,
    "index": 0, // index of current question
    "correct": [{
      "question": "_id",
      "answer": "stringa"
    }],
    "incorrect_answers": [{}],
    "picture": '',
    "username": '',
    "perf": {}
  }],
  "teams": ["_id1","_id2"],
  "questions": ["_ids"], // full object during game
  "result": 1, // 1, 0, 0.5
  "status": "play", // end
}

export class GameStore {

  constructor() {
    this.searching = null // can be any game type
    this.games = []
  }

  // current game playing, undefined if not playing
  @observable current

  @computed get isPlaying() {
    return current !== undefined
  }

  startGame(game) {
    this.games.push(game)
    this.setCurrent(game._id)
  }

  @action setCurrent(_id) {
    let game = _.find(this.games, {_id})
    this.current = game
    extendObservable(this.current, Object.keys(this.current))
  }
}
