import { observable, action, computed, toJS } from 'mobx';

export class Store {
  @observable item = 'This is an item.';
  @action setItem(data) {
    this.item = data;
  }
}
