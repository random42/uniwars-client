import { Actions } from 'react-native-router-flux'
import { game as socket } from '../api/socket'
import { game as store} from '../store'

game.on('new_game', ({_id, type}) => {
  let obj = {
    game: _id,
    response: ''
  }
  if (store.searching === type)
    obj.response = 'y'
  else obj.response = 'n'
  socket.emit('join', obj)
})

game.on('start_game', ({game}) => {
  store.startGame(game)
  Actions.game()
})

game.on('question', ({ game, question }) => {

})

game.on('mate_answer', ({user, question, answer}) => {
  // TODO
})
