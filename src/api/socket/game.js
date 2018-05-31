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

socket.on('new_game', (_id, type) => {
  if (store.game.searching === type) {
    socket.emit('join', _id)
  }
  else {
  }
})

export default socket;
