import { Actions } from 'react-native-router-flux'
import { game as socket } from '../api/socket'
import store from '../store'


socket.on('new_game', ({_id, type}) => {
  let obj = {
    game: _id,
    response: ''
  }
  if (store.game.searching === type)
    obj.response = 'y'
  else obj.response = 'n'
  socket.emit('join', obj)
})

socket.on('game_start', ({game}) => {
  store.game.startGame(game)
  Actions.push('game-match-preview', {game})
})

socket.on('question', ({ game, question }) => {
  Actions.push('game-question', { game, question })
})

socket.on('mate_answer', ({user, question, answer}) => {
  // TODO
})

socket.on('game_end', (stats) => {
  console.log(stats.result)
  Actions.push('game-end', {result: stats.result})
})
