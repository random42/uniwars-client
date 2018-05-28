import io from 'socket.io-client';
import { chat as socket } from './main';
import store from '../../store';
let server = require('../server.json');


socket.on('connect', () => {
  store.api.setSocket({chat: true});
})

socket.on('disconnect', () => {
  store.api.setSocket({chat: false});
})

export default socket
