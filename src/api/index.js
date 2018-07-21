import axios from 'axios'

let server = require('./server.json');
axios.defaults.baseURL = server.base_url;



export User from './user'
export Team from './team'
export Uni from './uni'
export Game from './game'
export Chat from './chat'
export * as Socket from './socket'

export default module.exports
