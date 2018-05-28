import io from 'socket.io-client';
import store from '../../store';
let server = require('../server.json');

let socket = io(server.base_url, {
  autoConnect: false,
  reconnection: true
});

export default socket
export let manager = socket.io;

export let chat = manager.socket('/chat', {
  autoConnect: false,
  reconnection: false
});

export let game = manager.socket('/game', {
  autoConnect: false,
  reconnection: false
});

socket.on('connect', () => {
  //if (!store.auth) return;
  socket.emit('auth', {_id: "5b03cb5391e852092f45b981"});    /*TODO put auth*/
  console.log('auth emitted');
  socket.on('auth', () => {
    store.api.setSocket({main: true});
    game.open();
    chat.open();
  })
})

socket.on('disconnect', () => {
  api.store.setSocket({main: false});
})
