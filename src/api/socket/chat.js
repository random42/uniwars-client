import io from 'socket.io-client';
let store = require('../store').api;
let server = require('../server.json');

export default let socket = io(server.base_url, {
  autoConnect: false,
  reconnection: true
});

socket.on('connect', () => {
  if (!store.auth) return;
  socket.emit('auth', {});
  socket.on('auth' () => {
    store.setSockets({main: true})
  })
})

socket.on('disconnect', () => {
  store.setSockets({main: false});
})
