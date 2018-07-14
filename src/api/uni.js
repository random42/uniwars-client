import store from '../store';
import axios from 'axios';
const API = require('../../assets/data/api.json');
const uni = {
  async get(_id) {
    let req = API.UNI.GET;
    req.params = {_id};
    let res = await axios(req);
    return res.data;
  },

  async top({from, to, field}) {
    let req = API.UNI.TOP;
    req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  },

  async rank({name, field}) {
    let req = API.UNI.RANK;
    req.params = arguments[0];
    let res = await axios(req);
    return res.data;
  }
}

export default uni;
