import { observable, action, computed, toJS } from 'mobx';
import { NetInfo } from 'react-native';
import { Socket } from '../api'

export class ApiStore {

  constructor() {
    NetInfo.isConnected.fetch().then((conn) => {
      this.setInternet(conn);
    }).catch((err) => console.log(err));
    NetInfo.addEventListener('connectionChange',({type, effectiveType}) => {
      let connected = ['none','unknown'].indexOf(type) < 0
      if (connected !== this.internet)
        this.setInternet(connected);
    });

    const { main } = Socket
    main.on('auth', () => {
      this.setAuth(true)
    })
    main.on('disconnect', () => {
      this.setAuth(false)
    })
  }


  // is the device connected to the internet?
  @observable internet;

  // is the user connected and authenticated to the server?
  @observable auth = false;

  @action setInternet(boolean) {
    this.internet = boolean;
    console.log("Internet =>", boolean);
  }

  @action setAuth(boolean) {
    this.auth = boolean;
    console.log("Auth =>", boolean);
  }
}
