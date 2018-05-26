import io from 'socket.io-client';
let store = require('../store');
let server = require('../server.json');

export default let socket = io(server.base_url + '/game', {
  autoConnect: false,
  reconnection: true
});

socket.on('connect', () => {
  socket.on('new_game', (_id, type) => {
    if (store.game.searching === type) {
      socket.emit('join', _id)
    }
    else {
    }
  })
})

socket.on('disconnect', () => {

})
