import io from 'socket.io-client';
let server = require('./server.json');

let socket = io(server.base_url, {
  autoConnect: false,
  reconnection: true
});

module.exports.main = socket;

export let manager = socket.io;

export let chat = manager.socket('/chat', {
  autoConnect: false,
  reconnection: false
});

export let game = manager.socket('/game', {
  autoConnect: false,
  reconnection: false
})

let auth


export const connect = ({ _id, token }) => {
  socket.open()
  chat.open()
  game.open()
  socket.once('connect', () => {
    socket.emit('auth', {_id, token})
    socket.once('auth', () => {
      auth = { _id, token }
    })
  })
}

module.exports.default = module.exports
