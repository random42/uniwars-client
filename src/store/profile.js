import { observable, action, computed, toJS } from 'mobx';

export class ProfileStore {
  @observable _id = 0;
  @observable username = 'random';
  @observable name = 'Roberto Sero';
  @observable major = 'Computer Science';
  @observable uni = {
    _id: 0,
    name: 'University of Turin',
  };
  @observable team = {
    _id: 0,
    name: 'Lo Svarione'
  };
  @observable image = 'https://lh3.googleusercontent.com/-4MU4Y5CRpiQ/WiyuJ9TNpvI/AAAAAAAAF6o/Ga9O3uPtRM8jWWNWS-h0hJAl9QTy-hudQCEwYBhgL/w280-h280-p/profilo.jpg';
  @observable settings;
  @observable token;

  @action setItem(data) {
    this.item = data;
  }
}
