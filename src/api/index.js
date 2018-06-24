import axios from 'axios'

let server = require('./server.json');
axios.defaults.baseURL = server.base_url;

export user from './user'
export team from './team'
export uni from './uni'
export game from './game'
export chat from './chat'
export * as socket from './socket'
