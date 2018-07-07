import store from '../store';
import axios from 'axios';
const API = require('./api-requests');
const team = {

  async create(name) {
    let req = API.TEAM.CREATE;
    req.data = {name};
    let res = await axios(req);
    return res.data;
  },

  async delete(team) {
    let req = API.TEAM.DELETE;
    req.params = {team};
    let res = await axios(req);
  },

  async get(_id) {
    let req = API.TEAM.GET;
    req.params = {_id};
    let res = await axios(req);
    return res.data;
  },

  async invite({team, invited}) {
    let req = API.TEAM.INVITE;
    req.params = arguments[0];
    let res = await axios(req);
  },

  async respondInvite({team, response}) {
    let req = API.TEAM.RESPOND_INVITE;
    req.params = arguments[0];
    let res = await axios(req);
  },

  async challenge({team, enemy}) {
    let req = API.TEAM.CHALLENGE;
    req.params = arguments[0];
    let res = await axios(req);
  },

  async respondChallenge({team, enemy, response}) {
    let req = API.TEAM.RESPOND_CHALLENGE;
    req.params = arguments[0];
    let res = await axios(req);
  },


}


export default team;
