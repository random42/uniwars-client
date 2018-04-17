let server = require('./server.json');
import axios from 'axios';

export const UserApi = {
  async login(form) {
    if (form.password) {
      axios({
        method: 'get',
        baseURL: server.base_url,
        data: form,
      })
    }
  },

  register(form) {

  }
}
