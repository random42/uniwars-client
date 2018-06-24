import io from 'socket.io-client';
import store from '../../store';
import { game as socket } from './main';
let server = require('../server.json');

socket.on('connect', () => {
  store.api.setSocket({game: true});
})

socket.on('disconnect', () => {
  store.api.setSocket({game: false});
})


export default socket;
