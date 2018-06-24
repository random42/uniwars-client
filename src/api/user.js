const API = require('./api-requests');
import store from '../store';
import axios from 'axios';

const user = {
  async register({username, email, password}) {
    let req = API.USER.REGISTER;
    req.data = arguments[0];
    let res = await axios(req);
  },
  // user document
  async login({username, email, password}) {
    let req = API.USER.LOGIN;
    req.params = {username};
    req.data = {password};
    let res = await axios(req);
    let data = res.data;
    let _id = data.user._id;
    let token = data.token;
    console.log(username,'logged in');
    axios.defaults.headers['user'] = _id;
    axios.defaults.headers['Authorization'] = token;
    store.api.login_token = token;
    return data.user;
  },
  async logout() {
    let req = API.USER.LOGOUT;
    req.params.username = store.profile.username;
    let res = await axios(req);
  },
  async addFriend({user = '_id'}) {
    let req = API.USER.ADD_FRIEND;
    req.params.to = user;
    let res = await axios(req);
  },
  async respondFriendRequest({user = '_id', response = 'y'}) { // 'y' for yes, anything else for no
    let req = API.USER.RESPOND_FRIEND_REQUEST;
    req.params.response = response;
    req.params.user = user;
    let res = await axios(req);
  },
  async deleteAccount({password}) {
    let req = API.USER.DELETE_ACCOUNT;
    let req.data = {password};
    let res = await axios(req);
  },
  async setPicture(buffer) {
    let req = API.USER.SET_PICTURE;
    let req.data = buffer;
    let res = await axios(req);
  },
  getPicture({_id, size = "small"}) { // medium, large
    let url = axios.defaults.baseURL;
    url += API.USER.GET_PICTURE.url;
    url += "?_id=" + _id + "&size=" + size;
    return url;
  },

  async challenge(user) {
    let req = API.USER.CHALLENGE;
    let req.params = {to: user};
    let res = await axios(req);
  },
  
}


export default user;
