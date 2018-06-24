import store from '../store';
import axios from 'axios';
const API = require('./api-requests');
const uni = {
  async get(_id) {
    let req = API.UNI.GET;
    let req.params = {_id};
    let res = await axios(req);
    return res.data;
  },

  async top({from, to, field}) {
    let req = API.UNI.TOP;
    let req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  },

  async rank({name, field}) {
    let req = API.UNI.RANK;
    let req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  }
}

export default uni;
