import io from 'socket.io-client';
let store = require('../store').api;
let server = require('../server.json');

export default let socket = io(server.base_url + '/game', {
  autoConnect: false,
  reconnection: false
});

socket.on('connect', () => {
  if (!store.auth) return;
  socket.emit('auth', {});
  socket.on('auth', () => {
    store.setSockets({game: true})
  })
})

socket.on('disconnect', () => {
  store.setSockets({game: false});
})
