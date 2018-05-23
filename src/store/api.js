import { observable, action, computed, toJS } from 'mobx';
import { NetInfo } from 'react-native';
let debug = require('debug')('store:api');

export class ApiStore {

  constructor() {
    NetInfo.isConnected.fetch.then((conn) => {
      debug('isConnected =>',conn);
      this.setInternet(conn);
    })
    NetInfo.addEventListener('connectionChange',({type, effectiveType}) => {
      let connected =
        type in ['none','unknown'] ? false : true
      if (connected !== this.internet)
        this.setInternet(connected);
    });
  }


  // is the device connected to the internet?
  @observable internet;

  // connected sockets
  @observable sockets = {
    main: false,
    chat: false,
    game: false
  }

  // is the user logged in?
  @observable auth = false;

  @action setInternet(boolean) {
    this.internet = boolean;
    debug('internet =>', boolean);
  }

  @action setSockets(connections = {}) {
    for (let key in connections) {
      this.sockets[key] = connections[key];
    }
  }

  @action setAuth(boolean) {
    this.auth = boolean;
  }
}
