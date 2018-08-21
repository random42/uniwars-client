const API = require('../../assets/data/api.json');
import store from '../store';
import axios from 'axios';

const user = {
  async register(form) {
    let req = API.USER.REGISTER;
    req.data = form;
    let res = await axios(req);
  },
  // user document
  async login({user, password}) {
    let req = API.USER.LOGIN
    req.params = {user}
    req.data = {password}
    let res = await axios(req)
    let data = res.data
    axios.defaults.headers['user'] = data.user._id;
    axios.defaults.headers['Authorization'] = data.token;
    store.api.access_token = data.token;
    return data;
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
    req.data = {password};
    let res = await axios(req);
  },
  async setPicture(buffer) {
    let req = API.USER.SET_PICTURE;
    req.data = buffer;
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
    req.params = {to: user};
    let res = await axios(req);
  },
  async top() {

  },
}


export default user;
