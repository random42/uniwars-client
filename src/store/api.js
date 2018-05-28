import { observable, action, computed, toJS } from 'mobx';
import { NetInfo } from 'react-native';

export class ApiStore {

  constructor() {
    NetInfo.isConnected.fetch().then((conn) => {
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

  // is the socket connected?
  @observable socket = {
    main: false,
    chat: false,
    game: false
  };

  // is the user logged in?
  @observable auth = false;

  @action setInternet(boolean) {
    this.internet = boolean;
    console.log("Internet =>", boolean);
  }

  @action setSocket(state = {}) {
    for (let i in state) {
      this.socket[i] = state[i];
    }
    console.log("Socket =>", state);
  }

  @action setAuth(boolean) {
    this.auth = boolean;
    console.log("Auth =>", boolean);
  }
}
