import store from '../store'
import axios from 'axios'
import { game as socket } from './socket'
const API = require('../../assets/data/api.json')

const game = {
  async answer({game, question, answer}) {
    socket.emit('answer', arguments[0])
  },

  async search({type}) {
    socket.emit('search', arguments[0])
  },

  async stopSearch({type}) {
    socket.emit('stop_search', arguments[0])
  },

  async joinGame({game}) {
    socket.emit('join', arguments[0])
  }
}



export default game;
