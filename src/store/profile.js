import { observable, action, computed, toJS } from 'mobx';

const TEST = {
  _id : 0,
  username : 'random',
  name : 'Roberto Sero',
  major : 'Computer Science',
  perf : {
    rating: 2412
  },
  uni : {
    _id: 0,
    name: 'University of Turin',
  },
  team : {
    _id: 0,
    name: 'Lo Svarione'
  },
  picture : 'https://lh3.googleusercontent.com/-4MU4Y5CRpiQ/WiyuJ9TNpvI/AAAAAAAAF6o/Ga9O3uPtRM8jWWNWS-h0hJAl9QTy-hudQCEwYBhgL/w280-h280-p/profilo.jpg',
  settings: {

  },
}

export class ProfileStore {
  constructor() {
    this.loadUser(TEST)
  }

  @observable _id
  @observable username = 'random'
  @observable name = 'Roberto Sero'
  @observable major = 'Computer Science'
  @observable perf = {

  }
  @observable uni = {
    _id: 0,
    name: 'University of Turin',
  }
  @observable team = {
    _id: 0,
    name: 'Lo Svarione'
  }
  @observable picture = 'https://lh3.googleusercontent.com/-4MU4Y5CRpiQ/WiyuJ9TNpvI/AAAAAAAAF6o/Ga9O3uPtRM8jWWNWS-h0hJAl9QTy-hudQCEwYBhgL/w280-h280-p/profilo.jpg';
  @observable settings;

  @action loadUser(user) {
    for (let i in user) {
      this[i] = user[i]
    }
  }
}
