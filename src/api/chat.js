import store from '../store';
import axios from 'axios';
const API = require('./api-requests');
const chat = {
  async getMessages({chat, time}) {
    let req = API.CHAT.GET_MESSAGES;
    req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  },

  async createGroup({name, participants = []}) {
    let req = API.CHAT.CREATE_GROUP;
    req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  },

  async createPrivate(partner) {
    let req = API.CHAT.CREATE_PRIVATE;
    req.params = {partner};
    let res = await axios(req);
    return res.data;
  },

  async leaveGroup(chat) {
    let req = API.CHAT.LEAVE_GROUP;
    req.params = {chat};
    let res = await axios(req);
  },

  async addToGroup({chat, invited = []}) {
    let req = API.CHAT.ADD_USERS;
    req.params = arguments[0];
    let res = await axios(req);
  },

  async removeFromGroup({chat, removed = []}) {
    let req = API.CHAT.REMOVE_USERS;
    req.params = arguments[0];
    let res = await axios(req);
  }
}



export default chat;
